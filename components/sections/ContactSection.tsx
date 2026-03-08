'use client';

import { useState, useEffect, useTransition } from 'react';
import { motion } from 'motion/react';
import { Send, Check, AlertTriangle } from 'lucide-react';
import Script from 'next/script';
import { sendMessage } from '@/app/actions';
import { useTranslations } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    grecaptcha: {
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

export default function ContactSection() {
  const t = useTranslations();
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [siteKey, setSiteKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((cfg) => setSiteKey(cfg.recaptchaSiteKey));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteKey) return;
    setError(false);
    startTransition(async () => {
      const token = await window.grecaptcha.execute(siteKey, { action: 'submit_form' });
      const result = await sendMessage(message, token);
      if (result.success) {
        setSubmitted(true);
        setMessage('');
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(true);
      }
    });
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan">
            {t.contact.command}
          </h2>
          <h3 className="font-display text-5xl md:text-6xl font-black text-white">
            {t.contact.title} <span className="text-gradient-cyan-magenta">{t.contact.titleAccent}</span>
          </h3>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-xl p-8 border border-[#00FFFF]/20 scanlines"
        >
          {!submitted ? (
            <>
              {siteKey && (
                <Script
                  src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
                  strategy="afterInteractive"
                />
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Terminal Prompt */}
                <div className="font-terminal text-[#00FFFF] mb-4">
                  {t.contact.prompt}
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.placeholder}
                    rows={6}
                    className="w-full bg-[#1a1a1a] border border-[#00FFFF]/30 rounded-lg px-4 py-3 text-[#E8E8E8] font-terminal text-sm focus:outline-none focus:border-[#00FFFF] transition-all resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isPending || !siteKey}
                  whileHover={isPending ? {} : { scale: 1.02 }}
                  whileTap={isPending ? {} : { scale: 0.98 }}
                  className="w-full font-terminal text-lg px-8 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF] hover:text-[#0D0D0D] box-glow-cyan transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className={`w-5 h-5 ${isPending ? 'animate-pulse' : ''}`} />
                  <span>{isPending ? t.contact.transmitting : t.contact.transmit}</span>
                </motion.button>

                {/* reCAPTCHA attribution */}
                <p className="font-terminal text-xs text-[#555555] text-center">
                  {t.contact.recaptchaNotice}{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#888888] transition-colors"
                  >
                    {t.contact.recaptchaPrivacy}
                  </a>{' '}
                  {t.contact.recaptchaAnd}{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#888888] transition-colors"
                  >
                    {t.contact.recaptchaTerms}
                  </a>{' '}
                  {t.contact.recaptchaApply}
                </p>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 font-terminal text-sm text-[#FF00AA]"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{t.contact.error}</span>
                  </motion.div>
                )}

                {/* Alternative Contact */}
                <div className="text-center pt-6 border-t border-[#00FFFF]/20">
                  <p className="font-terminal text-sm text-[#888888] mb-2">
                    {t.contact.orContact}
                  </p>
                  <a
                    href="mailto:lucas.macori@gmail.com"
                    className="font-terminal text-[#00FFFF] hover:text-[#FF00AA] transition-colors glow-cyan"
                  >
                    lucas.macori@gmail.com
                  </a>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00FF66]/20 border-2 border-[#00FF66] flex items-center justify-center box-glow-green"
              >
                <Check className="w-10 h-10 text-[#00FF66]" />
              </motion.div>
              <h4 className="font-display text-2xl font-bold text-white mb-2">
                {t.contact.successTitle}
              </h4>
              <p className="font-terminal text-[#00FF66]">
                {t.contact.successMessage}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Availability Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass rounded-xl p-6 border border-[#00FFFF]/20"
        >
          <h4 className="font-terminal text-sm text-[#888888] mb-4">
            {t.contact.bestTimes}
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {t.contact.days.map((day, i) => (
              <div key={day} className="text-center">
                <div className="font-terminal text-xs text-[#888888] mb-2">{day}</div>
                <div
                  className={`h-12 rounded ${
                    i < 5
                      ? 'bg-[#00FF66]/30 border border-[#00FF66]'
                      : 'bg-[#888888]/20 border border-[#888888]/30'
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="font-terminal text-xs text-[#888888] mt-4 text-center">
            {t.contact.weekdayResponse}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
