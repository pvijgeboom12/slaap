// Cloudflare Worker voor slaapcongres.nl.
// Statische pagina's komen uit dist/ (ASSETS). Alleen /api/* loopt via deze code.
//
// /api/contact – contactformulier
//   1. controleert het Turnstile-token aan de serverkant (TURNSTILE_SECRET)
//   2. valideert naam, e-mail en bericht (alle drie verplicht); honeypot-veld "website" moet leeg zijn
//   3. verstuurt het bericht via Cloudflare Email Routing (binding MAIL) naar CONTACT_TO
// Er wordt niets opgeslagen. Geheimen staan alleen in Cloudflare, nooit in de repository.
import { EmailMessage } from 'cloudflare:email';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });

const clean = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\n/g, ' ');
const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

// RFC 2047-codering voor kopregels met niet-ASCII-tekens (é, ë, …)
const encWord = (s) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`);
function b64(s) {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

async function verifyTurnstile(token, secret, ip) {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = await r.json().catch(() => ({}));
  return data.success === true;
}

async function contact(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
  const type = request.headers.get('Content-Type') || '';
  let data;
  try {
    data = type.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // Honeypot: bots vullen dit veld in. Doe alsof het gelukt is, verstuur niets.
  if (clean(data.website, 200)) return json({ ok: true });

  // Naam: één veld "name" (nieuw formulier) of "first" + "last" (oud formulier)
  const name = oneLine(data.name, 200) || [oneLine(data.first, 100), oneLine(data.last, 100)].filter(Boolean).join(' ');
  const email = oneLine(data.email, 200);
  const org = oneLine(data.org, 200);
  const topic = oneLine(data.subject, 200);
  const message = clean(data.message, 5000);
  const lang = data.lang === 'en' ? 'en' : 'nl';

  if (!name || !EMAIL.test(email) || !message) return json({ ok: false, error: 'validation' }, 422);

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(String(data['cf-turnstile-response'] || ''), env.TURNSTILE_SECRET, request.headers.get('CF-Connecting-IP'));
    if (!ok) return json({ ok: false, error: 'turnstile' }, 403);
  }

  const to = String(env.CONTACT_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  const from = env.CONTACT_FROM;
  if (!env.MAIL || !from || !to.length) return json({ ok: false, error: 'config' }, 500);

  const subject = topic ? `${topic} (via slaapcongres.nl, ${name})` : `Vraag via slaapcongres.nl van ${name}`;
  const body = [
    `Naam: ${name}`,
    `E-mail: ${email}`,
    `Organisatie: ${org || '-'}`,
    `Onderwerp: ${topic || '-'}`,
    `Taal website: ${lang.toUpperCase()}`,
    '',
    message || '(geen bericht)',
    '',
    '--',
    'Verstuurd via het contactformulier op slaapcongres.nl. Beantwoorden gaat rechtstreeks naar de afzender.',
  ].join('\r\n');

  try {
    for (const rcpt of to) {
      const raw = [
        `From: ${encWord('SLAAP2027 website')} <${from}>`,
        `To: <${rcpt}>`,
        `Reply-To: ${encWord(name)} <${email}>`,
        `Subject: ${encWord(subject)}`,
        `Date: ${new Date().toUTCString()}`,
        `Message-ID: <${crypto.randomUUID()}@${from.split('@')[1]}>`,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        b64(body).replace(/.{76}/g, '$&\r\n'),
      ].join('\r\n');
      await env.MAIL.send(new EmailMessage(from, rcpt, raw));
    }
  } catch (e) {
    console.error('mail failed', e && e.message);
    return json({ ok: false, error: 'send' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return contact(request, env);
    return env.ASSETS.fetch(request);
  },
};
