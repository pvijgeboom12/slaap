# Checklist livegang slaapcongres.nl

Alles wat live gaat of DNS wijzigt, gebeurt pas na akkoord van Pieter. Inloggen doet Pieter zelf.

## A. Eenmalige inrichting (vóór de eerste preview)

17 nov 2026: Worker `slaap` aangemaakt in het Cloudflare-account van Annick (JCC), gekoppeld aan `pvijgeboom12/slaap`. Build command `npm run build`, deploy `npx wrangler deploy`, preview builds aan (`npx wrangler preview`).

- [x] Cloudflare (account JCC): Workers & Pages → Create → Import a repository → `pvijgeboom12/slaap`. Build command `npm run build`, deploy command `npx wrangler deploy`, non-production branch deploy command `npx wrangler versions upload`.
- [ ] Na de eerste build: open de `*.workers.dev`-URL. Controleer of de header `X-Robots-Tag: noindex` er staat.
- [ ] Pages CMS: log in op app.pagescms.org met GitHub, kies repo `slaap` en sla één kleine wijziging op. Controleer of er een commit komt en of Cloudflare opnieuw bouwt.
- [ ] Maak een branch `concept` voor previews van Annick. Zet het preview-adres in de beheerinstructie.
- [ ] Geef Annick schrijfrechten op de GitHub-repo.

## B. Contactformulier

- [x] Turnstile: widget "SLAAP contactformulier" aangemaakt op 20 nov 2026 voor `slaapcongres.nl`, `slaap.acgoijarts.workers.dev` en `fase-1-save-the-date-slaap.acgoijarts.workers.dev`.
- [x] Sitekey staat in `src/lib/site.ts` (`turnstileSiteKey`), 20 nov 2026.
- [ ] Zet de geheime sleutel als secret `TURNSTILE_SECRET` in de Worker.
- [x] Email Routing: aan op het subdomein `post.jcc-congressen.nl` (account JCC), niet op het hoofddomein. Daar staan de MX-records van Google Workspace.
- [x] `info@slaapcongres.nl` (eigen mailbox van de stichting) staat als destination address op Verified in Annicks Cloudflare-account (gezien 26 nov 2026 12:50, aangemaakt 21 nov). Alleen `slaap@jcc-congress.com` staat op Pending; dat adres gebruikt de Worker niet.
- [x] `CONTACT_TO` in `wrangler.jsonc` is `info@slaapcongres.nl`.

## C. Inhoud

- [ ] De conceptvertaling van de Engelse pagina's is gecontroleerd door JCC of het comité.
- [ ] Registratie- en abstractlinks, hotelboekingslink en dinerticket zijn ingevuld in Instellingen congres.
- [ ] Privacyverklaring en algemene voorwaarden staan online, en hun links staan in Instellingen congres → Overige links.
- [ ] De PDF's zijn geüpload: programma, posteroverzicht en voorwaarden.
- [ ] De SEO-titels en -omschrijvingen per pagina zijn nagelopen.

## Stand 26 nov 2026

- Productie van Worker `slaap` (`slaap.acgoijarts.workers.dev`) is nog de handmatige deploy van 17 nov met alleen statische bestanden. `/api/contact` geeft daar 404. `TURNSTILE_SECRET` is nog niet gezet.
- De preview `fase-1-save-the-date-slaap.acgoijarts.workers.dev` draait wel de Worker-code: GET `/api/contact` geeft 405 `{"ok":false,"error":"method"}`.
- `slaapcongres.nl` toont de under construction-pagina (Worker `slaap-under-construction`), zonder formulier.
- Branch `fase-1-save-the-date` (6b3b89f) bouwt foutloos. `wrangler.jsonc` en `worker/index.js` zijn gecontroleerd.
- Deploy, secret en formuliertest kunnen nu al. Dat is niet publiek zichtbaar: Worker `slaap` hangt alleen aan `slaap.acgoijarts.workers.dev`, en `slaapcongres.nl` en `www` blijven op `slaap-under-construction`. Op de livegangdag verandert dan alleen nog de domeinwissel.
- Let op: zonder `TURNSTILE_SECRET` slaat de Worker de Turnstile-controle over. Zet het secret dus vóór de domeinwissel.
- Deployen kan niet vanuit een cloudomgeving van Claude (`wrangler login` werkt daar niet). Kies op de livegangdag: lokaal deployen vanaf Pieters laptop, de productiebranch wijzigen in het Cloudflare-dashboard, of PR #1 mergen naar `main`.

## Open punten (26 nov 2026)

- [ ] Nameservers: de publieke resolver van Google gaf op 26 nov nog ns1/ns2.dewebmakers.nl en MX `mail.slaapcongres.nl`, terwijl de zone in Cloudflare actief is. Check op dnschecker.org (NS en MX) of de overstap overal is doorgekomen. Zo niet, dan komt externe mail niet in Google aan en is de domeinwissel geen enkele stap meer.
- [ ] DKIM: de verificatie van `slaapcongres.nl` loopt in de Google Admin Console, maar is nog niet bevestigd. Check dit op 27 nov opnieuw.
- [ ] `post.slaapcongres.nl`: daar staat Email Routing aan, met drie Cloudflare-MX-records, SPF en `cf2024-1._domainkey`. Op deze branch staat de afzender op `post.jcc-congressen.nl`; branch `teksten-annick` (PR 3) gebruikt wél `formulier@post.slaapcongres.nl`. Beslis welke afzender live gaat vóór je `post.slaapcongres.nl` weghaalt.
- [ ] Delegatie van `info@slaapcongres.nl`: wacht op Annick. Daarna de handtekening en SPF/DKIM/DMARC in info@ controleren.

## Volgorde (nu al mogelijk, niet publiek)

1. Deploy `fase-1-save-the-date` (of `main` na merge van PR #1) als productieversie van Worker `slaap`.
2. Pieter zet zelf het secret: `npx wrangler secret put TURNSTILE_SECRET`, met de waarde uit Turnstile → SLAAP contactformulier.
3. Controleer GET `https://slaap.acgoijarts.workers.dev/api/contact`: dit moet 405 geven, geen 404.
4. Verstuur een testbericht via `slaap.acgoijarts.workers.dev`. Controleer of het aankomt op `info@slaapcongres.nl` en of Beantwoorden naar de afzender gaat.
5. Livegangdag: alleen nog de custom domains omzetten (zie D).

## D. Livegang (na akkoord Pieter)

- [x] DNS van `slaapcongres.nl` naar Cloudflare: gedaan 21-22 nov 2026. Nameservers bij Mijndomein staan op robert/ziggy.ns.cloudflare.com (account Annick); de mailrecords zijn 1-op-1 overgenomen. `slaapcongres.nl` en `www` tonen tot de livegang de under construction-pagina (Worker `slaap-under-construction`).
- [ ] Custom domains `slaapcongres.nl` en `www.slaapcongres.nl` weghalen bij Worker `slaap-under-construction` en toevoegen aan Worker `slaap` (Settings → Domains & Routes).
- [ ] Voeg `www.slaapcongres.nl` toe en stuur het door naar het domein zonder www, met een Redirect Rule.
- [ ] Zet `indexable: true` in `src/lib/site.ts`. Commit dit op `main`.
- [ ] Controleer daarna `https://slaapcongres.nl/`: geen meta-noindex en geen X-Robots-Tag.
- [ ] Cloudflare Web Analytics: voeg de site toe en zet het token in `src/lib/site.ts` (`cfAnalyticsToken`).
- [ ] Google Search Console: voeg het domein toe en dien `https://slaapcongres.nl/sitemap-index.xml` in.
- [ ] Verstuur een testbericht via het contactformulier, in NL en in EN. Controleer of beide adressen het bericht ontvangen en of antwoorden naar de afzender gaat.
- [ ] Controleer de redirects: `/index-en` moet naar `/en/` gaan.
- [ ] Doe een eindcheck op mobiel en desktop: menu, taalwissel, dagtabs in het programma en de ankers.
