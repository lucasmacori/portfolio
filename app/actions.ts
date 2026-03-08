'use server';

export async function sendMessage(message: string): Promise<{ success: boolean }> {
  const auth = process.env.N8N_PORTFOLIO_AUTH;

  if (!auth) {
    console.error('N8N_PORTFOLIO_AUTH environment variable is not set');
    return { success: false };
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
