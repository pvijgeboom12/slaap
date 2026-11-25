// Worker "slaap-preview": vaste, korte previewlink https://preview.slaapcongres.nl
// Zelfde opzet als preview.jcc-congress.com. Plak deze code in Cloudflare (Workers & Pages >
// slaap-preview > Edit code) en klik Deploy. Andere branch tonen: pas BRANCH aan en deploy opnieuw.
const BRANCH = 'teksten-annick';
const ORIGIN = `${BRANCH}-slaap.acgoijarts.workers.dev`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const shortHost = url.host;
    url.host = ORIGIN;
    const upstream = await fetch(new Request(url, request), { redirect: 'manual' });
    const res = new Response(upstream.body, upstream);
    const loc = res.headers.get('Location');
    if (loc) res.headers.set('Location', loc.replace(ORIGIN, shortHost));
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  },
};
