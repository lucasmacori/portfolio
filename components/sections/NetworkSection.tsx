'use client';

import { motion } from 'motion/react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import type { ComponentType } from 'react';

interface NetworkNode {
  name: string;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  color: string;
  description: string;
  activity?: string;
}

const nodes: NetworkNode[] = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/lucasmacori',
    color: '#00FFFF',
    description: 'Central hub for all projects',
    activity: '142 contributions this year',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/lucas-macori-56b445223',
    color: '#FF00AA',
    description: 'Professional network',
    activity: 'Active daily',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:lucas.macori@gmail.com',
    color: '#00FF66',
    description: 'lucas.macori@gmail.com',
    activity: 'Response time: < 24h',
  },
  {
    name: 'Blog',
    icon: FileText,
    url: 'https://sfeir.dev/author/lucas/',
    color: '#9945FF',
    description: 'Technical articles & insights',
    activity: 'Published at sfeir.dev',
  },
];

export default function NetworkSection({ publicRepos }: { publicRepos: number | null }) {
  return (
    <section id="network" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan">
            &gt; netstat
          </h2>
          <h3 className="font-display text-5xl md:text-6xl font-black text-white">
            NETWORK <span className="text-gradient-magenta-purple">NODES</span>
          </h3>
        </motion.div>

        {/* Constellation Network Visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
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
                  initial={{ opacity: 0, scale: 0 }}
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
                          <Icon className="w-6 h-6" style={{ color: node.color }} />
                        </div>
                        <div>
                          <h4 className="font-display text-xl font-bold text-white">{node.name}</h4>
                          <div className="font-terminal text-xs" style={{ color: node.color }}>
                            ACTIVE
                          </div>
                        </div>
                      </div>

                      {/* Pulse Indicator */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm text-[#E8E8E8] mb-3">{node.description}</p>

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
                      animate={{ width: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Central Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="font-body text-[#E8E8E8]">
            Based in <span className="text-[#00FFFF]">Lille 🍺, France 🥐</span> • Looking to relocate to{' '}
            <span className="text-[#FF00AA]">Canada 🍁</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
