'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Mail, FileText } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { useTranslations } from '@/contexts/LanguageContext';
import { useAnimationPreference } from '@/contexts/AnimationContext';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons';

interface NetworkNode {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  url: string;
  color: string;
  activity?: string;
}

const nodes: NetworkNode[] = [
  {
    name: 'GitHub',
    icon: GitHubIcon,
    url: 'https://github.com/lucasmacori',
    color: '#00FFFF',
    activity: 'placeholder',
  },
  {
    name: 'LinkedIn',
    icon: LinkedInIcon,
    url: 'https://linkedin.com/in/lucas-macori-56b445223',
    color: '#FF00AA',
    activity: 'Active daily',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:lucas.macori@gmail.com',
    color: '#00FF66',
    activity: 'Response time: < 24h',
  },
  {
    name: 'Blog',
    icon: FileText,
    url: 'https://sfeir.dev/author/lucas/',
    color: '#B18CFF',
    activity: 'Published at sfeir.dev',
  },
];

export default function NetworkSection({ publicRepos }: { publicRepos: number | null }) {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const { paused } = useAnimationPreference();

  return (
    <section id="network" aria-labelledby="network-title" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan" aria-hidden="true">
            {t.network.command}
          </p>
          <h2 id="network-title" className="font-display text-4xl md:text-6xl font-black text-white">
            {t.network.title} <span className="text-gradient-magenta-purple">{t.network.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Constellation Network Visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Lines */}
          <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {nodes.map((_, i) => {
              if (i < nodes.length - 1) {
                const angle1 = (i * 360) / nodes.length;
                const angle2 = ((i + 1) * 360) / nodes.length;
                const x1 = 50 + Math.cos((angle1 * Math.PI) / 180) * 25;
                const y1 = 50 + Math.sin((angle1 * Math.PI) / 180) * 25;
                const x2 = 50 + Math.cos((angle2 * Math.PI) / 180) * 25;
                const y2 = 50 + Math.sin((angle2 * Math.PI) / 180) * 25;
                return (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(0, 255, 255, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* Network Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <motion.a
                  key={node.name}
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.accessibility.externalLink(node.name)}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-xl p-6 border border-[#00FFFF]/20 hover:border-[#00FFFF] hover:box-glow-cyan transition-all duration-300 group relative overflow-hidden"
                  style={{ borderColor: `${node.color}30` }}
                >
                  {/* Animated Background Pulse */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundColor: node.color }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Name */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300"
                          style={{ borderColor: node.color, backgroundColor: `${node.color}20` }}
                        >
                          <Icon aria-hidden="true" className="w-6 h-6" style={{ color: node.color }} />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-white underline decoration-[#00FFFF] underline-offset-4">{node.name}</h3>
                          <div className="font-terminal text-xs" style={{ color: node.color }}>
                            {t.network.active}
                          </div>
                        </div>
                      </div>

                      {/* Pulse Indicator */}
                      <motion.div
                        aria-hidden="true"
                        animate={prefersReducedMotion || paused ? { scale: 1, opacity: 1 } : { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                        transition={prefersReducedMotion || paused ? { duration: 0 } : { duration: 2, repeat: Infinity }}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm text-[#E8E8E8] mb-3">
                      {t.network.nodeDescriptions[node.name] ?? ''}
                    </p>

                    {/* Activity */}
                    {node.activity && (
                      <div className="font-terminal text-xs text-[#888888] flex items-center">
                        <span className="mr-2">▸</span>
                        {node.name === 'GitHub' && publicRepos != null
                          ? `${publicRepos} public repos`
                          : node.activity}
                      </div>
                    )}

                    {/* Data Transfer Animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: node.color }}
                      animate={prefersReducedMotion || paused ? { width: '0%' } : { width: ['0%', '100%', '0%'] }}
                      transition={prefersReducedMotion || paused ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Central Node */}
          <motion.div
            aria-hidden="true"
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass-strong border-2 border-[#00FFFF] box-glow-cyan flex items-center justify-center pointer-events-none hidden md:flex"
          >
            <div className="text-center">
              <div className="font-terminal text-xs text-[#00FFFF]">HUB</div>
              <div className="font-display text-xl font-bold text-white">LM</div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="font-body text-[#E8E8E8]">
            {t.network.location} <span className="text-[#00FFFF]">{t.network.locationValue}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
