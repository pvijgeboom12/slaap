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
- [ ] Voeg `info@slaapcongres.nl` (eigen mailbox van de stichting) toe als destination address en laat Annick de verificatiemail bevestigen. Toegevoegd op 20 nov 2026; verificatie: bevestigen en hier afvinken.
- [x] `CONTACT_TO` in `wrangler.jsonc` is `info@slaapcongres.nl`.

## C. Inhoud

- [ ] De conceptvertaling van de Engelse pagina's is gecontroleerd door JCC of het comité.
- [ ] Registratie- en abstractlinks, hotelboekingslink en dinerticket zijn ingevuld in Instellingen congres.
- [ ] Privacyverklaring en algemene voorwaarden staan online, en hun links staan in Instellingen congres → Overige links.
- [ ] De PDF's zijn geüpload: programma, posteroverzicht en voorwaarden.
- [ ] De SEO-titels en -omschrijvingen per pagina zijn nagelopen.

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
