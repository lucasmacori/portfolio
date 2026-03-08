'use client';

import { motion } from 'motion/react';
import { ExternalLink, Lock } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  status: 'live' | 'in-progress' | 'archived';
  link?: string;
  locked?: boolean;
}

const projects: Project[] = [
  {
    title: 'Loyalty Program Platform',
    description: 'React/NextJS micro-frontend architecture with a brand new design system for seamless user experiences.',
    tech: ['React', 'NextJS', 'TypeScript', 'Design System'],
    metrics: [
      { label: 'Users', value: '50K+' },
      { label: 'Performance', value: '98%' },
    ],
    status: 'live',
    link: '#',
  },
  {
    title: 'Two-Factor Auth System',
    description: 'Security-focused public website integration enabling robust 2FA for enterprise applications.',
    tech: ['Java', 'SpringBoot', 'Security'],
    metrics: [
      { label: 'Security', value: 'A+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    status: 'live',
    link: '#',
  },
  {
    title: 'Warehouse & Mobile BFF',
    description: 'SpringBoot backend + Angular frontend for sports equipment manufacturer warehouse management.',
    tech: ['SpringBoot', 'Angular', 'PostgreSQL'],
    metrics: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Lines', value: '25K+' },
    ],
    status: 'live',
    link: '#',
  },
  {
    title: 'Personal Kubernetes Cluster',
    description: 'NestJS API + NuxtJS frontend with GitHub Actions CI/CD pipeline for automated deployments.',
    tech: ['Kubernetes', 'NestJS', 'NuxtJS', 'GitHub Actions'],
    metrics: [
      { label: 'Containers', value: '12' },
      { label: 'Deploy Time', value: '< 5min' },
    ],
    status: 'live',
    link: '#',
  },
  {
    title: 'Technical Blog',
    description: 'Articles on sfeir.dev including introduction to vibe coding and modern development practices.',
    tech: ['Writing', 'DevOps', 'Best Practices'],
    metrics: [
      { label: 'Articles', value: '15+' },
      { label: 'Views', value: '10K+' },
    ],
    status: 'live',
    link: 'https://sfeir.dev/author/lucas/',
  },
  {
    title: 'CLASSIFIED',
    description: 'Something special is brewing here... Try the Konami code to unlock.',
    tech: ['???', '???', '???'],
    metrics: [
      { label: 'Status', value: 'LOCKED' },
      { label: 'Access', value: 'DENIED' },
    ],
    status: 'in-progress',
    locked: true,
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
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-xl p-6 border border-[#00FFFF]/20 hover:border-[#00FFFF] hover:box-glow-cyan transition-all duration-300 group perspective"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-terminal text-xs px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}
                >
                  {project.locked ? '🔒 CLASSIFIED' : project.status.toUpperCase()}
                </span>
                {!project.locked ? (
                  <ExternalLink className="w-5 h-5 text-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <Lock className="w-5 h-5 text-[#FF00AA]" />
                )}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
