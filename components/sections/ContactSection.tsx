'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
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
  const [isConfigReady, setIsConfigReady] = useState(false);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((cfg) => setSiteKey(cfg.recaptchaSiteKey ?? null))
      .catch(() => setSiteKey(null))
      .finally(() => setIsConfigReady(true));
  }, []);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteKey || !isRecaptchaReady || !window.grecaptcha) {
      setError(true);
      return;
    }
    setError(false);
    startTransition(async () => {
      try {
        const token = await window.grecaptcha.execute(siteKey, { action: 'submit_form' });
        const result = await sendMessage(message, token);
        if (!result.success) throw new Error('Contact submission failed');
        setSubmitted(true);
        setMessage('');
      } catch {
        setError(true);
      }
    });
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-terminal text-[#00FFFF] text-xl mb-2 glow-cyan" aria-hidden="true">
            {t.contact.command}
          </p>
          <h2 id="contact-title" className="font-display text-4xl md:text-6xl font-black text-white">
            {t.contact.title} <span className="text-gradient-cyan-magenta">{t.contact.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Contact Form */}
        <motion.div
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
                  onReady={() => setIsRecaptchaReady(true)}
                  onError={() => setIsRecaptchaReady(false)}
                />
              )}
              <form onSubmit={handleSubmit} aria-busy={isPending} className="space-y-6">
                {/* Terminal Prompt */}
                <p aria-hidden="true" className="font-terminal text-[#00FFFF] mb-1">
                  {t.contact.prompt}
                </p>
                <p id="contact-instructions" className="font-body text-sm text-[#E8E8E8] mb-4">
                  {t.accessibility.contactInstructions}
                </p>

                {/* Message Input */}
                <div className="relative">
                  <label htmlFor="contact-message" className="block font-terminal text-sm text-[#E8E8E8] mb-2">
                    {t.accessibility.contactLabel}
                  </label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.placeholder}
                    rows={6}
                    aria-describedby="contact-instructions"
                    className="w-full bg-[#1a1a1a] border border-[#00FFFF]/70 rounded-lg px-4 py-3 text-[#E8E8E8] font-terminal text-base focus:border-[#00FFFF] transition-all"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isPending || !siteKey || !isRecaptchaReady}
                  whileHover={isPending ? {} : { scale: 1.02 }}
                  whileTap={isPending ? {} : { scale: 0.98 }}
                  className="w-full font-terminal text-lg px-8 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF] hover:text-[#0D0D0D] box-glow-cyan transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send aria-hidden="true" className={`w-5 h-5 ${isPending ? 'animate-pulse' : ''}`} />
                  <span>{isPending ? t.contact.transmitting : t.contact.transmit}</span>
                </motion.button>
                {isPending && (
                  <p role="status" aria-live="polite" className="font-terminal text-sm text-[#E8E8E8]">
                    {t.accessibility.sending}
                  </p>
                )}
                {isConfigReady && (!siteKey || !isRecaptchaReady) && (
                  <p role="status" className="font-terminal text-sm text-[#E8E8E8]">
                    {!siteKey ? t.accessibility.recaptchaUnavailable : t.accessibility.formUnavailable}
                  </p>
                )}

                {/* reCAPTCHA attribution */}
                <p className="font-terminal text-xs text-[#888888] text-center">
                  {t.contact.recaptchaNotice}{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.accessibility.googlePolicy(t.contact.recaptchaPrivacy)}
                  className="inline-block min-h-6 py-1 underline underline-offset-2 hover:text-[#888888] transition-colors"
                  >
                    {t.contact.recaptchaPrivacy}
                  </a>{' '}
                  {t.contact.recaptchaAnd}{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.accessibility.googlePolicy(t.contact.recaptchaTerms)}
                    className="inline-block min-h-6 py-1 underline underline-offset-2 hover:text-[#888888] transition-colors"
                  >
                    {t.contact.recaptchaTerms}
                  </a>{' '}
                  {t.contact.recaptchaApply}
                </p>

                {/* Error Message */}
                {error && (
                  <motion.div
                    role="alert"
                    className="flex items-center space-x-2 font-terminal text-sm text-[#FF00AA]"
                  >
                    <AlertTriangle aria-hidden="true" className="w-4 h-4 shrink-0" />
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
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-center py-12"
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00FF66]/20 border-2 border-[#00FF66] flex items-center justify-center box-glow-green"
              >
                <Check aria-hidden="true" className="w-10 h-10 text-[#00FF66]" />
              </motion.div>
              <h3 ref={successRef} tabIndex={-1} className="font-display text-2xl font-bold text-white mb-2">
                {t.contact.successTitle}
              </h3>
              <p className="font-terminal text-[#00FF66]">
                {t.accessibility.success}
              </p>
              <button type="button" onClick={() => { setSubmitted(false); requestAnimationFrame(() => messageRef.current?.focus()); }} className="mt-6 min-h-11 rounded-lg border border-[#00FFFF] px-5 py-2 text-[#00FFFF] underline underline-offset-4">
                {t.accessibility.sendAnother}
              </button>
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
          <h3 className="font-terminal text-sm text-[#888888] mb-4">
            {t.contact.bestTimes}
          </h3>
          <div className="grid grid-cols-7 gap-2" role="list" aria-label={t.accessibility.availability}>
            {t.contact.days.map((day, i) => (
              <div key={day} role="listitem" aria-label={i < 5 ? t.accessibility.dayAvailable(day) : t.accessibility.dayUnavailable(day)} className="text-center">
                <div className="font-terminal text-xs text-[#888888] mb-2">{day}</div>
                <div
                  aria-hidden="true"
                  className={`h-12 rounded ${
                    i < 5
                      ? 'bg-[#00FF66]/30 border border-[#00FF66]'
                      : 'bg-[#888888]/20 border border-[#888888]/30'
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="font-terminal text-sm text-[#E8E8E8] mt-4 text-center">
            {t.accessibility.availability}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
