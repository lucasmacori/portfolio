'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Download, Award, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslations, useLanguage } from '@/contexts/LanguageContext';

interface TimelineNode {
  key: string;
  year: string;
  role: string;
  company: string;
  tech: string[];
}

const timeline: TimelineNode[] = [
  {
    key: 'sfeir',
    year: '2024–Present',
    role: 'Lead Full-Stack Developer',
    company: 'SFEIR',
    tech: ['Java', 'TypeScript', 'React', 'SpringBoot', 'K8S', 'Terraform', 'GCP'],
  },
  {
    key: 'cgi-engineer',
    year: '2022–2024',
    role: 'Software Engineer',
    company: 'CGI',
    tech: ['React', 'Angular', 'SpringBoot', 'PostgreSQL'],
  },
  {
    key: 'cgi-data',
    year: '2019–2022',
    role: 'Data Consultant',
    company: 'CGI',
    tech: ['InterSystems ESB / IRIS', 'ObjectScript', 'SQL', 'Python', 'Angular', 'TypeScript'],
  },
  {
    key: 'cgi-apprentice',
    year: '2018–2019',
    role: 'Apprenticeship',
    company: 'CGI',
    tech: ['InterSystems ESB / IRIS', 'Angular', 'TypeScript', 'SQL'],
  },
  {
    key: 'sicad',
    year: '2016–2018',
    role: 'IT Student',
    company: 'SICAD',
    tech: ['.net', 'SQL'],
  },
];

const skills = [
  { category: 'Languages', items: ['Java', 'TypeScript', 'Python', 'SQL', 'Bash'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Angular', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Spring Boot', 'NestJS', 'Node.js', 'REST', 'GraphQL'] },
  { category: 'Cloud & DevOps', items: ['GCP', 'Kubernetes', 'Terraform', 'Docker'] },
  { category: 'Tools', items: ['Git', 'GitHub Actions', 'IntelliJ', 'Figma'] },
];

const tagContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
};

export default function ResumeSection() {
  const t = useTranslations();
  const { lang: currentLang } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDownload = (lang: 'en' | 'fr') => {
    const link = document.createElement('a');
    link.href = `/lucasmacori_resume_${lang}.pdf`;
    link.download = `lucasmacori_resume_${lang}.pdf`;
    link.click();
    setDropdownOpen(false);
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setDropdownOpen(false);
  };

  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan">
            {t.resume.command}
          </h2>
          <h3 className="font-display text-5xl md:text-6xl font-black text-white">
            {t.resume.title} <span className="text-gradient-cyan-magenta">{t.resume.titleAccent}</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Circuit Board Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FFFF] via-[#FF00AA] to-[#00FF66]"></div>

              <div className="space-y-12">
                {timeline.map((node, index) => (
                  <motion.div
                    key={node.key}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Node Indicator */}
                    <div className="absolute left-0 top-0 w-6 h-6 -ml-3 rounded-full bg-[#00FFFF] border-4 border-[#0D0D0D] box-glow-cyan"></div>

                    {/* Content Card */}
                    <div className="glass rounded-xl p-6 border border-[#00FFFF]/20 hover:border-[#00FFFF] hover:box-glow-cyan transition-all duration-300">
                      {/* Year Badge */}
                      <div className="font-terminal text-xs text-[#00FFFF] mb-2">
                        [ {node.year} ]
                      </div>

                      {/* Role & Company */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-display text-xl font-bold text-white mb-1">
                            {node.role}
                          </h4>
                          <div className="flex items-center space-x-2 text-[#E8E8E8]">
                            <Briefcase aria-hidden="true" className="w-4 h-4" />
                            <span className="font-body">{node.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <ul className="space-y-2 mb-4">
                        {(t.resume.timelineAchievements[node.key] ?? []).map((achievement, i) => (
                          <li key={i} className="font-body text-sm text-[#E8E8E8] flex items-start">
                            <span className="text-[#00FFFF] mr-2">▸</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {node.tech.map((tech) => (
                          <span
                            key={tech}
                            className="font-terminal text-xs px-2 py-1 bg-[#1a1a1a] rounded border border-[#00FFFF]/20 text-[#00FFFF]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 border border-[#00FFFF]/20"
            >
              <h4 className="font-display text-2xl font-bold text-white mb-6 flex items-center">
                <Award aria-hidden="true" className="w-6 h-6 mr-2 text-[#00FFFF]" />
                {t.resume.skills}
              </h4>

              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="font-terminal text-xs text-[#888888] mb-2">
                      {t.resume.skillCategories[skill.category] ?? skill.category}
                    </div>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={tagContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {skill.items.map((item) => (
                        <motion.span
                          key={item}
                          variants={tagVariants}
                          className="font-terminal text-xs px-2 py-1 bg-[#1a1a1a] rounded border border-[#00FFFF]/30 text-[#00FFFF] hover:border-[#00FFFF] hover:bg-[#00FFFF]/10 transition-colors duration-200 cursor-default"
                        >
                          {item}
                        </motion.span>
                      ))}
                      <motion.span
                        variants={tagVariants}
                        className="font-terminal text-xs px-2 py-1 text-[#444444] cursor-default select-none"
                        aria-hidden="true"
                      >
                        …
                      </motion.span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Currently Learning */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6 border border-[#FF00AA]/20 box-glow-magenta"
            >
              <h4 className="font-display text-xl font-bold text-white mb-4">
                {t.resume.currentlyLearning}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-terminal text-sm text-[#E8E8E8]">CKAD Certification</span>
                  <span className="font-terminal text-xs text-[#00FFFF]">{t.resume.certified}</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[#00FFFF]"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-terminal text-sm text-[#E8E8E8]">SpringBoot WebFlux</span>
                  <span className="font-terminal text-xs text-[#00FF66]">{t.resume.inProgress}</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '50%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[#00FF66] pulse-green"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-terminal text-sm text-[#E8E8E8]">Terraform</span>
                  <span className="font-terminal text-xs text-[#00FF66]">{t.resume.inProgress}</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '10%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[#00FF66] pulse-green"
                  />
                </div>
              </div>
            </motion.div>

            {/* Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative w-full"
            >
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                className="w-full font-terminal px-6 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF] hover:text-[#0D0D0D] box-glow-cyan transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download aria-hidden="true" className="w-5 h-5" />
                <span>{t.resume.printBlueprint}</span>
                <ChevronDown aria-hidden="true" className={`w-4 h-4 ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    role="menu"
                    onKeyDown={handleDropdownKeyDown}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-2 left-0 w-full glass border border-[#00FFFF]/40 rounded-lg overflow-hidden z-10"
                  >
                    {(['en', 'fr'] as const).map((lang) => (
                      <button
                        key={lang}
                        role="menuitem"
                        onClick={() => handleDownload(lang)}
                        className={`w-full flex items-center space-x-3 px-5 py-3 font-terminal text-sm transition-colors duration-150
                          ${lang === currentLang
                            ? 'text-[#00FFFF] bg-[#00FFFF]/10'
                            : 'text-[#888888] hover:text-[#00FFFF] hover:bg-[#00FFFF]/5'
                          }`}
                      >
                        <span className="uppercase tracking-widest text-xs opacity-60">{lang}</span>
                        <span>{lang === 'en' ? t.resume.downloadEn : t.resume.downloadFr}</span>
                        {lang === currentLang && <span className="ml-auto text-[10px] opacity-50">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
