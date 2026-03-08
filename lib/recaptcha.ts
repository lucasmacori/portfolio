interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(token: string): Promise<{ valid: boolean; score?: number }> {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token,
    }),
  });

  const data: RecaptchaResponse = await response.json();

  return {
    valid: data.success && data.score >= 0.5 && data.action === 'submit_form',
    score: data.score,
  };
}
