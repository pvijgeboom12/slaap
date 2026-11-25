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

- afzender `formulier@post.slaapcongres.nl` (`CONTACT_FROM`; Email Routing staat alleen op het subdomein post.slaapcongres.nl)
- ontvanger `info@slaapcongres.nl` (`CONTACT_TO` in `wrangler.jsonc`)

Email Routing verstuurt alleen naar geverifieerde adressen. `info@slaapcongres.nl` moet dus één keer als
destination address in Annicks Cloudflare-account worden toegevoegd en bevestigd vanuit die mailbox.
Zet Email Routing nooit aan op slaapcongres.nl zelf: dat overschrijft de MX-records van Google.

Stand 25 november 2026: op de preview geeft `/api/contact` de fout `config` en er wordt niets verstuurd.
Nog te doen in Annicks Cloudflare (door Pieter):

1. Email Routing aan op het subdomein `post.slaapcongres.nl` (zone slaapcongres.nl). Cloudflare zet dan alleen MX/TXT voor `post.`.
2. `info@slaapcongres.nl` toevoegen als destination address. Annick bevestigt de verificatiemail in die mailbox.
   Is dat bij haar live-akkoord nog niet gebeurd, dan bevestigt ze het bij dat akkoord. Anders werkt het formulier niet.
3. Secret `TURNSTILE_SECRET` op Worker `slaap` (geheime sleutel van Turnstile-widget `0x4AAAAAAGKZctKxP9pYW39Q`).
   Hostnames van de widget: slaapcongres.nl, www.slaapcongres.nl, preview.slaapcongres.nl en acgoijarts.workers.dev.
4. Testinzending in NL en EN; controleer ontvangst in info@ en dat Beantwoorden naar de afzender gaat.
