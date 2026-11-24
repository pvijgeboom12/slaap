# Mail voor slaapcongres.nl

Ingericht op 20 november 2026 binnen de Google Workspace van JCC (beheerder beheer@jcc-congress.com).
Registrar is Mijndomein. Sinds 22 november 2026 staat de DNS in Cloudflare (zone `slaapcongres.nl` in Annicks account,
nameservers robert/ziggy.ns.cloudflare.com). De mailrecords zijn 1-op-1 overgenomen van Mijndomein.

- Mailbox: `info@slaapcongres.nl` (Business Starter), organisatie-eenheid "Slaapcongres", afgeschermd van JCC.
- DNS (Cloudflare, alle mailrecords op DNS only): Google-verificatie (TXT), SPF `v=spf1 include:_spf.google.com ~all`, MX `smtp.google.com` (prio 1),
  DKIM `google._domainkey`, DMARC via CNAME `_dmarc` → `dmarc-none.mijndomein.nl` (p=none, rapporten gaan naar Mijndomein).
  Gepland: tussen 4 en 18 december 2026 naar `p=quarantine`, na akkoord Pieter.
- Bij elke DNS-wijziging voor mail: A-, AAAA- en CNAME-records van de site niet aanraken, records vooraf vastleggen, site achteraf checken.
- Maildelegatie staat aan voor de OU Slaapcongres, zodat beheer@jcc-congress.com de mailbox kan openen.
  Annick geeft die toegang in Gmail van info@ via Instellingen > Accounts > "Toegang verlenen tot je account" (niet "Mail verzenden als").
- Geen aliassen (registratie@, abstracts@, sponsors@) en geen migratie: de oude mail bij De Webmakers is nooit gebruikt (Annick, 23 nov 2026).
- Geen automatisch antwoord of standaardantwoorden (Annick, 21 nov 2026). Handtekening: volgens Annicks voorbeeld, logo in `public/mail/`
  (na livegang via https://slaapcongres.nl/mail/).

## Contactformulier

Het formulier op de site (homepage en Contact) verstuurt via de Worker `slaap` en Cloudflare Email Routing:

- afzender `slaap-formulier@post.jcc-congressen.nl` (Email Routing staat alleen op het subdomein post.jcc-congressen.nl)
- ontvanger `info@slaapcongres.nl` (`CONTACT_TO` in `wrangler.jsonc`)

Email Routing verstuurt alleen naar geverifieerde adressen. `info@slaapcongres.nl` moet dus één keer als
destination address in Annicks Cloudflare-account worden toegevoegd en bevestigd vanuit die mailbox.
Zet Email Routing nooit aan op slaapcongres.nl zelf: dat overschrijft de MX-records van Google.
