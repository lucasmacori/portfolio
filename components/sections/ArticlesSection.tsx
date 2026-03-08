'use client';

import { motion } from 'motion/react';
import { Radio, TrendingUp } from 'lucide-react';

interface Article {
  title: string;
  category: string;
  readTime: string;
  date: string;
  views: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    title: 'Qu\'est ce que le Vibe coding ?',
    category: 'AI',
    readTime: '5 min',
    date: '2025.04.09',
    views: '0',
    featured: true,
  },
  {
    title: 'Découverte de Lynx, la nouvelle alternative à React Native',
    category: 'Development',
    readTime: '4 min',
    date: '2025.03.12',
    views: '0',
  },
  {
    title: 'Comment React 19 va simplifier votre vie de développeur Front-end',
    category: 'Development',
    readTime: '10 min',
    date: '2024.06.14',
    views: '0',
  },
];

export default function ArticlesSection() {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'development':
        return 'text-[#00FFFF] border-[#00FFFF]';
      case 'devops':
        return 'text-[#FF00AA] border-[#FF00AA]';
      case 'frontend':
        return 'text-[#00FF66] border-[#00FF66]';
      case 'backend':
        return 'text-[#9945FF] border-[#9945FF]';
      default:
        return 'text-[#00FFFF] border-[#00FFFF]';
    }
  };

  return (
    <section id="articles" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan">
            &gt; cat ~/transmissions
          </h2>
          <h3 className="font-display text-5xl md:text-6xl font-black text-white">
            INCOMING <span className="text-gradient-magenta-purple">SIGNALS</span>
          </h3>
        </motion.div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
              className={`glass rounded-xl p-6 border transition-all duration-300 cursor-pointer relative overflow-hidden ${article.featured
                  ? 'border-[#FF00AA] box-glow-magenta'
                  : 'border-[#00FFFF]/20 hover:border-[#00FFFF] hover:box-glow-cyan'
                }`}
            >
              {/* Featured Badge */}
              {article.featured && (
                <div className="absolute top-4 right-4">
                  <TrendingUp className="w-5 h-5 text-[#FF00AA]" />
                </div>
              )}

              {/* Waveform Visualization (Decorative) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-50"></div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  {/* Category Badge */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Radio className={`w-4 h-4 ${getCategoryColor(article.category)}`} />
                    <span
                      className={`font-terminal text-xs px-3 py-1 rounded-full border ${getCategoryColor(article.category)}`}
                    >
                      FREQ: {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-2xl font-bold text-white mb-2 hover:text-gradient-cyan-magenta transition-all">
                    {article.title}
                  </h4>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 font-terminal text-xs text-[#888888]">
                    <span>[ {article.date} ]</span>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <span>Signal strength:</span>
                      <span className="text-[#00FF66]">{article.views} views</span>
                    </div>
                  </div>
                </div>

                {/* Reading Progress Bar */}
                <div className="md:w-32">
                  <div className="font-terminal text-xs text-[#888888] mb-2">Progress</div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '0%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00FFFF] to-[#FF00AA]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.sfeir.dev/author/lucas/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-terminal text-[#00FFFF] hover:text-[#FF00AA] transition-colors border border-[#00FFFF]/30 hover:border-[#FF00AA] px-6 py-3 rounded-lg inline-block"
            aria-label="View all articles by Lucas on sfeir.dev (opens in a new tab)"
          >
            [ VIEW ALL ARTICLES ] →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
