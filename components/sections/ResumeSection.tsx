'use client';

import { motion } from 'motion/react';
import { Briefcase, Download, Award, ChevronDown } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';

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
  return (
    <section id="resume" aria-labelledby="resume-title" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan" aria-hidden="true">
            {t.resume.command}
          </p>
          <h2 id="resume-title" className="font-display text-4xl md:text-6xl font-black text-white">
            {t.resume.title} <span className="text-gradient-cyan-magenta">{t.resume.titleAccent}</span>
          </h2>
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
                    whileInView={{ opacity: 1 }}
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
                          <h3 lang="en" className="font-display text-xl font-bold text-white mb-1">
                            {node.role}
                          </h3>
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
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 border border-[#00FFFF]/20"
            >
              <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center">
                <Award aria-hidden="true" className="w-6 h-6 mr-2 text-[#00FFFF]" />
                {t.resume.skills}
              </h3>

              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.category}
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
                    initial={false}
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
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6 border border-[#FF00AA]/20 box-glow-magenta"
            >
              <h3 className="font-display text-xl font-bold text-white mb-4">
                {t.resume.currentlyLearning}
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.credly.com/badges/ebdbc513-5d75-435b-baa0-35fc7a3bf0a9"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.accessibility.externalLink(`${t.resume.viewBadge}: CKAD Certification on Credly`)}
                  className="flex min-h-11 items-center justify-between gap-3 py-2 hover:text-[#00FFFF] transition-colors"
                >
                  <span className="font-terminal text-sm text-[#E8E8E8]">CKAD Certification</span>
                  <span className="font-terminal text-xs text-[#00FFFF]">{t.resume.certified} · {t.resume.viewBadge}</span>
                </a>
                <div aria-hidden="true" className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[#00FFFF]"
                  />
                </div>
              </div>
              <a
                href="https://www.credly.com/badges/7c3203ac-9377-4dcf-a6df-dda32639225b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.accessibility.externalLink(`${t.resume.viewBadge}: Claude Developer Certification on Credly`)}
                className="mt-4 flex min-h-11 items-center justify-between gap-3 py-2 hover:text-[#00FFFF] transition-colors"
              >
                <span className="font-terminal text-sm text-[#E8E8E8]">Claude Developer Certification</span>
                <span className="font-terminal text-xs text-[#00FFFF]">{t.resume.viewBadge}</span>
              </a>
              <div aria-hidden="true" className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full bg-[#00FFFF]"
                />
              </div>
              <div className="space-y-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-terminal text-sm text-[#E8E8E8]">SpringBoot WebFlux</span>
                  <span className="font-terminal text-xs text-[#00FF66]">{t.resume.inProgress}</span>
                </div>
                <div aria-hidden="true" className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
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
                <div aria-hidden="true" className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <details className="resume-download">
                <summary className="w-full cursor-pointer list-none font-terminal px-6 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF] hover:text-[#0D0D0D] box-glow-cyan transition-all duration-300 flex items-center justify-center gap-2">
                  <Download aria-hidden="true" className="w-5 h-5" />
                  <span>{t.resume.printBlueprint}</span>
                  <ChevronDown aria-hidden="true" className="w-4 h-4" />
                </summary>
                <div className="mt-2 grid gap-2 rounded-lg border border-[#00FFFF]/40 bg-[#1a1a1a] p-2">
                  {(['en', 'fr'] as const).map((lang) => (
                    <a
                      key={lang}
                      href={`/lucasmacori_resume_${lang}.pdf`}
                      download
                      lang={lang}
                      className="flex min-h-11 items-center gap-3 rounded px-4 py-2 font-terminal text-sm text-[#E8E8E8] underline underline-offset-4 hover:text-[#00FFFF] focus-visible:outline-offset-2"
                    >
                      <span>{lang === 'en' ? t.resume.downloadEn : t.resume.downloadFr}</span>
                    </a>
                  ))}
                </div>
              </details>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
