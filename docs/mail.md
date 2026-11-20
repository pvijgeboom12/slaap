# Mail voor slaapcongres.nl

Ingericht op 20 november 2026 binnen de Google Workspace van JCC (beheerder beheer@jcc-congress.com).
DNS van slaapcongres.nl staat bij Mijndomein, niet in Cloudflare.

- Mailbox: `info@slaapcongres.nl` (Business Starter), organisatie-eenheid "Slaapcongres", afgeschermd van JCC.
- DNS bij Mijndomein: Google-verificatie (TXT), SPF `v=spf1 include:_spf.google.com ~all`, MX `smtp.google.com` (prio 1),
  DKIM `google._domainkey`, DMARC via CNAME `_dmarc` → `dmarc-none.mijndomein.nl` (p=none).
- Maildelegatie staat aan voor de OU Slaapcongres, zodat beheer@jcc-congress.com de mailbox kan openen.

## Contactformulier

Het formulier op de site (homepage en Contact) verstuurt via de Worker `slaap` en Cloudflare Email Routing:

- afzender `slaap-formulier@post.jcc-congressen.nl` (Email Routing staat alleen op het subdomein post.jcc-congressen.nl)
- ontvanger `info@slaapcongres.nl` (`CONTACT_TO` in `wrangler.jsonc`)

Email Routing verstuurt alleen naar geverifieerde adressen. `info@slaapcongres.nl` moet dus één keer als
destination address in Annicks Cloudflare-account worden toegevoegd en bevestigd vanuit die mailbox.
Zet Email Routing nooit aan op slaapcongres.nl zelf: dat overschrijft de MX-records van Google.
