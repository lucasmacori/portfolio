'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

// ---------------------------------------------------------------------------
// Virtual filesystem
// ---------------------------------------------------------------------------

type FSFile = { type: 'file'; name: string };
type FSDir  = { type: 'dir';  name: string; children: FSEntry[] };
type FSEntry = FSFile | FSDir;

const FS_ROOT: FSDir = {
  type: 'dir',
  name: '/',
  children: [
    {
      type: 'dir',
      name: 'bin',
      children: [
        { type: 'file', name: 'bash' },
        { type: 'file', name: 'cat' },
        { type: 'file', name: 'echo' },
        { type: 'file', name: 'grep' },
        { type: 'file', name: 'ls' },
        { type: 'file', name: 'sh' },
      ],
    },
    {
      type: 'dir',
      name: 'usr',
      children: [
        {
          type: 'dir',
          name: 'bin',
          children: [
            { type: 'file', name: 'curl' },
            { type: 'file', name: 'git' },
            { type: 'file', name: 'node' },
            { type: 'file', name: 'npm' },
            { type: 'file', name: 'python3' },
          ],
        },
        {
          type: 'dir',
          name: 'lib',
          children: [
            { type: 'file', name: 'konami.so.1' },
            { type: 'file', name: 'libc.so.6' },
            { type: 'file', name: 'libm.so.6' },
          ],
        },
        {
          type: 'dir',
          name: 'lucas',
          children: [
            { type: 'file', name: '.bashrc' },
            { type: 'file', name: 'Benny Harvey RIP' },
            { type: 'file', name: 'notes.txt' },
          ],
        },
        {
          type: 'dir',
          name: 'share',
          children: [
            { type: 'dir', name: 'doc',  children: [{ type: 'file', name: 'README' }] },
            { type: 'dir', name: 'man',  children: [{ type: 'file', name: 'ls.1' }, { type: 'file', name: 'cd.1' }] },
          ],
        },
      ],
    },
  ],
};

/** Resolve a path array to a directory node, or null if not found / not a dir. */
function resolveDir(path: string[]): FSDir | null {
  let node: FSDir = FS_ROOT;
  for (const segment of path) {
    const child = node.children.find((c) => c.name === segment);
    if (!child || child.type !== 'dir') return null;
    node = child;
  }
  return node;
}

/** Format a path array as a display string, e.g. [] → '/', ['usr'] → '/usr' */
function formatPath(path: string[]): string {
  return path.length === 0 ? '/' : '/' + path.join('/');
}

// ---------------------------------------------------------------------------
// Boot sequence
// ---------------------------------------------------------------------------

const BOOT_LINES = [
  'BIOS v2.4.1 — Konami Systems',
  'Memory check: 640K OK',
  'CPU: RETRO-8086 @ 4.77MHz... OK',
  '',
  '[  0.000000] Kernel 1.0.0 booting',
  '[  0.123456] Mounting rootfs... OK',
  '[  0.234567] Loading easter_egg.mod... OK',
  '[  0.456789] Starting system daemons...',
  '[  0.678901] System ready.',
  '',
  '  ╔══════════════════════════════════════╗',
  '  ║          KONAMI  OS  v1.0.0          ║',
  '  ╚══════════════════════════════════════╝',
  '',
  '  Type "help" for available commands.',
  '  Type "exit" to return to the portfolio.',
  '',
];

// ---------------------------------------------------------------------------
// Command output types
// ---------------------------------------------------------------------------

interface OutputLine {
  text: string;
  color?: string;
}

interface CmdEntry {
  prompt: string;
  output: OutputLine[];
  cwd: string[];
}

// ---------------------------------------------------------------------------
// Command handler
// ---------------------------------------------------------------------------

function runCommand(
  raw: string,
  cwd: string[],
  setCwd: (p: string[]) => void,
): OutputLine[] {
  const trimmed = raw.trim();
  if (trimmed === '') return [];

  const [cmd, ...args] = trimmed.split(/\s+/);

  // help
  if (cmd === 'help') {
    return [
      { text: 'Available commands:' },
      { text: '' },
      { text: '  ls              List directory contents' },
      { text: '  cd <dir>        Change directory  (e.g. cd usr, cd ..)' },
      { text: '  help            Show this help message' },
      { text: '  exit            Return to the portfolio' },
    ];
  }

  // ls
  if (cmd === 'ls') {
    const dir = resolveDir(cwd);
    if (!dir) return [{ text: 'ls: cannot access directory', color: '#FF6666' }];
    if (dir.children.length === 0) return [{ text: '(empty)' }];
    return dir.children.map((entry) =>
      entry.type === 'dir'
        ? { text: entry.name + '/', color: '#00FFCC' }
        : { text: entry.name },
    );
  }

  // cd
  if (cmd === 'cd') {
    const target = args[0] ?? '';

    if (!target || target === '/') {
      setCwd([]);
      return [];
    }

    if (target === '..' || target === '../') {
      setCwd(cwd.slice(0, -1));
      return [];
    }

    // Resolve relative segments (no absolute path support for simplicity)
    const newPath = [...cwd, target];
    if (resolveDir(newPath)) {
      setCwd(newPath);
      return [];
    }
    return [{ text: `cd: ${target}: No such directory`, color: '#FF6666' }];
  }

  return [{ text: `Unknown command: ${trimmed}`, color: '#888888' }];
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Phase = 'idle' | 'shutdown' | 'terminal';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KonamiCode() {
  const [, setKeys] = useState<string[]>([]);
  const [phase, setPhase]         = useState<Phase>('idle');
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(false);
  const [cwd, setCwd]             = useState<string[]>([]);
  const [input, setInput]         = useState('');
  const [cmdHistory, setCmdHistory] = useState<CmdEntry[]>([]);
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Konami code detection — only while idle
  useEffect(() => {
    if (phase !== 'idle') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (
          next.length === KONAMI_CODE.length &&
          next.every((k, i) => k === KONAMI_CODE[i])
        ) {
          setPhase('shutdown');
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  // Shutdown → terminal
  useEffect(() => {
    if (phase !== 'shutdown') return;
    const t = setTimeout(() => {
      setVisibleLines([]);
      setCmdHistory([]);
      setCwd([]);
      setPhase('terminal');
      setIsBooting(true);
    }, 950);
    return () => clearTimeout(t);
  }, [phase]);

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;
    let cancelled = false;
    let i = 0;
    const scheduleNext = () => {
      if (cancelled) return;
      if (i >= BOOT_LINES.length) {
        setIsBooting(false);
        setTimeout(() => inputRef.current?.focus(), 50);
        return;
      }
      const delay = i === 0 ? 300 : 90 + Math.floor(Math.random() * 80);
      setTimeout(() => {
        if (!cancelled) {
          setVisibleLines((prev) => [...prev, BOOT_LINES[i]]);
          i++;
          scheduleNext();
        }
      }, delay);
    };
    scheduleNext();
    return () => { cancelled = true; };
  }, [isBooting]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLines, cmdHistory, cwd]);

  const exitTerminal = () => {
    setPhase('idle');
    setVisibleLines([]);
    setCmdHistory([]);
    setInput('');
    setCwd([]);
    setIsBooting(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const raw = input.trim();
      setInput('');

      if (raw === 'exit' || raw === 'quit') {
        exitTerminal();
        return;
      }

      // Capture cwd before potential update so the entry records it correctly
      const entryCwd = cwd;
      let newCwd = cwd;
      const setCwdCapture = (p: string[]) => { newCwd = p; };

      const output = runCommand(raw, entryCwd, setCwdCapture);
      setCmdHistory((prev) => [...prev, { prompt: raw, output, cwd: entryCwd }]);
      if (newCwd !== entryCwd) setCwd(newCwd);
    } else if (e.key === 'Escape') {
      exitTerminal();
    }
  };

  const prompt = `root@konami-os:${formatPath(cwd)}$ `;

  return (
    <>
      {/* Shutdown CRT animation */}
      <AnimatePresence>
        {phase === 'shutdown' && (
          <>
            <motion.div
              key="shutdown-overlay"
              className="fixed inset-0 z-[9998] bg-black pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0.05, 0.85, 0.15, 1] }}
              transition={{ duration: 0.7, times: [0, 0.1, 0.2, 0.35, 0.45, 0.65], ease: 'linear' }}
            />
            <motion.div
              key="crt-line"
              className="fixed left-0 right-0 z-[9999] pointer-events-none"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                height: '3px',
                background: '#00FFFF',
                boxShadow: '0 0 12px 3px #00FFFF, 0 0 24px 6px rgba(0,255,255,0.4)',
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0.6, 0], scaleX: [0, 0, 1, 1, 1, 0] }}
              transition={{ duration: 0.95, times: [0, 0.55, 0.65, 0.78, 0.9, 1], ease: 'linear' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Terminal */}
      <AnimatePresence>
        {phase === 'terminal' && (
          <motion.div
            key="terminal"
            role="dialog"
            aria-modal="true"
            aria-label="Konami OS terminal"
            className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col cursor-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* CRT scanlines */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
              }}
            />

            {/* Vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 60%, rgba(0,10,0,0.5) 100%)',
              }}
            />

            {/* Terminal output */}
            <div className="flex-1 overflow-auto p-6 relative z-20" style={{ color: '#00FF41' }}>

              {/* Boot lines */}
              {visibleLines.map((line, i) => (
                <div
                  key={i}
                  className="text-sm leading-relaxed whitespace-pre"
                  style={{ textShadow: '0 0 8px rgba(0,255,65,0.6)' }}
                >
                  {line || '\u00a0'}
                </div>
              ))}

              {/* Command history */}
              {!isBooting &&
                cmdHistory.map((entry, i) => (
                  <div key={i} className="mt-4">
                    {/* Prompt + typed command */}
                    <div
                      className="text-sm leading-relaxed"
                      style={{ textShadow: '0 0 8px rgba(0,255,65,0.6)' }}
                    >
                      <span style={{ color: '#00FF41' }}>root@konami-os:{formatPath(entry.cwd)}$ </span>
                      <span>{entry.prompt}</span>
                    </div>
                    {/* Output lines */}
                    {entry.output.map((line, j) => (
                      <div
                        key={j}
                        className="text-sm leading-relaxed whitespace-pre"
                        style={{ color: line.color ?? '#00FF41', textShadow: line.color ? 'none' : '0 0 8px rgba(0,255,65,0.3)' }}
                      >
                        {line.text || '\u00a0'}
                      </div>
                    ))}
                  </div>
                ))}

              {/* Active input prompt */}
              {!isBooting && (
                <div
                  className="flex items-center text-sm leading-relaxed mt-4"
                  style={{ textShadow: '0 0 8px rgba(0,255,65,0.6)' }}
                >
                  <span style={{ color: '#00FF41' }}>{prompt}</span>
                  <span>{input}</span>
                  <span> </span>
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
                    style={{ color: '#00FF41' }}
                  >
                    █
                  </motion.span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Hidden input */}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              aria-label="Terminal input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="absolute opacity-0 pointer-events-none"
              style={{ left: '-9999px', top: '-9999px' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
