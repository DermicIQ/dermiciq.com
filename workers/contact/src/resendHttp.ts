export async function postResendEmail(options: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  logTag: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: options.from,
        to: options.to,
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
        subject: options.subject,
        text: options.text,
        html: options.html,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(options.logTag, {
        status: response.status,
        detail: detail.slice(0, 500),
      });
      return { ok: false, error: "Failed to send message" };
    }

    return { ok: true };
  } catch (error) {
    console.error(`${options.logTag}_exception`, {
      message: error instanceof Error ? error.message : "unknown",
    });
    return { ok: false, error: "Failed to send message" };
  }
}
