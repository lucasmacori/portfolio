'use server';

import { verifyRecaptcha } from '@/lib/recaptcha';

export async function sendMessage(message: string, token: string): Promise<{ success: boolean; error?: string }> {
  const auth = process.env.N8N_PORTFOLIO_AUTH;

  if (!auth) {
    console.error('N8N_PORTFOLIO_AUTH environment variable is not set');
    return { success: false };
  }

  const { valid } = await verifyRecaptcha(token);
  if (!valid) {
    return { success: false, error: 'reCAPTCHA verification failed' };
  }

  try {
    const res = await fetch('https://n8n.lucasmacori.fr/webhook/send-message-from-portfolio', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    return { success: res.ok };
  } catch {
    return { success: false };
  }
}
