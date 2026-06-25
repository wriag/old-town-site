import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Instantiated per-request inside the handler (not at module load) so the build
// never fails when RESEND_API_KEY is absent during static analysis.

// Address mail is forwarded to (the inbox actually monitored). Override via env.
const FORWARD_TO = process.env.FORWARD_TO_EMAIL ?? 'oldtownfreedist@gmail.com';
// Must be on the verified sending domain (oldtownfreedistpdx.org).
const FORWARD_FROM = 'Old Town Inbox <inbox@oldtownfreedistpdx.org>';

// Resend inbound-email webhook.
//
// Flow: Resend receives mail at the domain MX, POSTs an `email.received` event
// here (metadata only), we verify the svix signature, fetch the full body +
// attachments via the Receiving API, and forward the message to FORWARD_TO so
// it lands in the monitored Gmail inbox. Reply-To is set to the original sender
// so replies from Gmail go back to them.
export async function POST(req: Request): Promise<Response> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const payload = await req.text();

  let event;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: req.headers.get('svix-id') ?? '',
        timestamp: req.headers.get('svix-timestamp') ?? '',
        signature: req.headers.get('svix-signature') ?? '',
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET ?? '',
    });
  } catch (err) {
    console.error('Inbound webhook signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type !== 'email.received') {
    // Acknowledge other event types without forwarding them.
    return new Response('OK', { status: 200 });
  }

  const emailId = event.data.email_id;

  // Webhook payload is metadata only — fetch the body separately.
  const { data: email, error: getError } = await resend.emails.receiving.get(emailId);
  if (getError || !email) {
    console.error('Failed to fetch received email body:', getError);
    // Return 200 so Resend does not retry indefinitely; the email is still
    // available in the Resend dashboard.
    return new Response('OK', { status: 200 });
  }

  // Download any attachments and re-encode them for the forwarded send
  // (single send — batch does not support attachments).
  let attachments: { filename: string; content: string }[] = [];
  try {
    const { data: attList } = await resend.emails.receiving.attachments.list({
      emailId,
    });
    if (attList && attList.data.length > 0) {
      attachments = await Promise.all(
        attList.data.map(async (att) => {
          const res = await fetch(att.download_url);
          const buffer = Buffer.from(await res.arrayBuffer());
          return {
            filename: att.filename ?? `attachment-${att.id}`,
            content: buffer.toString('base64'),
          };
        })
      );
    }
  } catch (err) {
    // Don't lose the message over an attachment hiccup — forward the body anyway.
    console.error('Failed to fetch attachments, forwarding without them:', err);
  }

  const originalFrom = event.data.from;
  const originalTo = event.data.to?.join(', ') ?? '';
  const note = `Forwarded from ${originalFrom} (to ${originalTo})`;

  // `text` is always a defined string so the send always has body content.
  const text = `${note}\n\n${email.text ?? ''}`;

  const { error: sendError } = await resend.emails.send(
    {
      from: FORWARD_FROM,
      to: [FORWARD_TO],
      replyTo: originalFrom,
      subject: `Fwd: ${event.data.subject ?? '(no subject)'}`,
      text,
      ...(email.html
        ? { html: `<p style="color:#888;font-size:12px">${note}</p>${email.html}` }
        : {}),
      ...(attachments.length > 0 ? { attachments } : {}),
    },
    { idempotencyKey: `forward-inbound/${emailId}` }
  );

  if (sendError) {
    console.error('Failed to forward inbound email:', sendError);
    return new Response('Forward failed', { status: 500 });
  }

  return new Response('OK', { status: 200 });
}
