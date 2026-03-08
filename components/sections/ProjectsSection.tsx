'use client';

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  status: 'live' | 'in-progress' | 'archived';
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Portfolio',
    description: "The very site you're browsing — built with Next.js, Tailwind CSS and Framer Motion. Source open on GitHub.",
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Type', value: 'This site' },
    ],
    status: 'live',
    link: 'https://github.com/lucasmacori/portfolio',
  },
  {
    title: 'Phrase Auto-Translate',
    description: 'Fetches untranslated keys from PhraseApp, automatically translates them with DeepL, and pushes them back — fully automated i18n workflow.',
    tech: ['JavaScript', 'DeepL API', 'PhraseApp'],
    metrics: [
      { label: 'Type', value: 'Tool' },
    ],
    status: 'live',
    link: 'https://github.com/lucasmacori/phrase-app-auto-translate',
  },
  {
    title: 'ng-minesweeper',
    description: 'Classic Minesweeper game built with Angular — fully playable in the browser with customizable grid size and mine count.',
    tech: ['Angular', 'TypeScript'],
    metrics: [
      { label: 'Type', value: 'Game' },
      { label: 'Framework', value: 'Angular' },
    ],
    status: 'archived',
    link: 'https://github.com/lucasmacori/ng-minesweeper',
  },
  {
    title: 'Dotfiles',
    description: 'All the configuration for the goodies I use on a daily basis — shell, editor, window manager and more.',
    tech: ['Fish', 'QML', 'Shell'],
    metrics: [
      { label: 'Type', value: 'Rizz' },
    ],
    status: 'live',
    link: 'https://github.com/lucasmacori/dotfiles',
  },
];

export default function ProjectsSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-[#00FF66] pulse-green';
      case 'in-progress':
        return 'text-[#FF6B00]';
      case 'archived':
        return 'text-[#888888]';
      default:
        return 'text-[#00FFFF]';
    }
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan">
            &gt; ls ~/projects
          </h2>
          <h3 className="font-display text-5xl md:text-6xl font-black text-white">
            THE <span className="text-gradient-cyan-magenta">LAB</span>
          </h3>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-xl p-6 border border-[#00FFFF]/20 hover:border-[#00FFFF] hover:box-glow-cyan transition-all duration-300 group perspective block"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-terminal text-xs px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}
                >
                  {project.status.toUpperCase()}
                </span>
                <ExternalLink className="w-5 h-5 text-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Project Title */}
              <h4 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gradient-cyan-magenta transition-all">
                {project.title}
              </h4>

              {/* Description */}
              <p className="font-body text-[#E8E8E8] text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-terminal text-xs px-2 py-1 bg-[#1a1a1a] rounded border border-[#00FFFF]/20 text-[#00FFFF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#00FFFF]/20">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="font-terminal text-xs text-[#888888] mb-1">{metric.label}</div>
                    <div className="font-display font-bold text-[#00FFFF]">{metric.value}</div>
                  </div>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
