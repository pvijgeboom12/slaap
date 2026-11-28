# Checklist livegang slaapcongres.nl

Alles wat live gaat of DNS wijzigt, gebeurt pas na akkoord van Pieter. Inloggen doet Pieter zelf.

## A. Eenmalige inrichting (vóór de eerste preview)

17 nov 2026: Worker `slaap` aangemaakt in het Cloudflare-account van Annick (JCC), gekoppeld aan `pvijgeboom12/slaap`. Build command `npm run build`, deploy `npx wrangler deploy`, preview builds aan (`npx wrangler preview`).

- [ ] Cloudflare (account JCC): Workers & Pages → Create → Import a repository → `pvijgeboom12/slaap`. Build command `npm run build`, deploy command `npx wrangler deploy`, non-production branch deploy command `npx wrangler versions upload`.
- [ ] Na de eerste build: open de `*.workers.dev`-URL. Controleer of de header `X-Robots-Tag: noindex` er staat.
- [ ] Pages CMS: log in op app.pagescms.org met GitHub, kies repo `slaap` en sla één kleine wijziging op. Controleer of er een commit komt en of Cloudflare opnieuw bouwt.
- [ ] Maak een branch `concept` voor previews van Annick. Zet het preview-adres in de beheerinstructie.
- [ ] Nodig Annick (annick@jcc-congress.com) uit als medewerker in Pages CMS, ná het mergen naar main.

## B. Contactformulier

- [ ] Turnstile: maak een widget aan voor `slaapcongres.nl` en het `workers.dev`-previewdomein.
- [ ] Zet de sitekey in `src/lib/site.ts` (`turnstileSiteKey`).
- [ ] Zet de geheime sleutel als secret `TURNSTILE_SECRET` in de Worker: Settings → **Runtime** variables and secrets → Add → Type Secret → Deploy. Dit kan pas nadat de Worker-code op `main` staat (livegang, stap D). Een Worker met alleen statische bestanden accepteert geen secrets, en previews gebruiken de runtime-secrets van productie. Let op: de waarden onder Builds → Variables and secrets zijn alleen voor de build en doen niets voor het formulier (28 nov 2026 daar per ongeluk gezet).
- [ ] Email Routing: aan op het subdomein `post.slaapcongres.nl` (zone slaapcongres.nl, account Annick), niet op het hoofddomein. Daar staan de MX-records van Google Workspace.
- [ ] Voeg `info@slaapcongres.nl` (eigen mailbox van de stichting) toe als destination address en laat Annick de verificatiemail bevestigen.
- [ ] Controleer `wrangler.jsonc`: `CONTACT_FROM` = formulier@post.slaapcongres.nl, `CONTACT_TO` = info@slaapcongres.nl.
- [ ] Is info@ niet geverifieerd vóór de livegang, dan bevestigt Annick dat bij haar live-akkoord.

## C. Inhoud

- [ ] De conceptvertaling van de Engelse pagina's is gecontroleerd door JCC of het comité.
- [ ] Registratie- en abstractlinks, hotelboekingslink en dinerticket zijn ingevuld in Instellingen congres.
- [ ] Privacyverklaring en algemene voorwaarden staan online, en hun links staan in Instellingen congres → Overige links.
- [ ] De PDF's zijn geüpload: programma, posteroverzicht en voorwaarden.
- [ ] De SEO-titels en -omschrijvingen per pagina zijn nagelopen.

## D. Livegang (na akkoord Pieter)

- [ ] DNS van `slaapcongres.nl` naar Cloudflare: zet de nameservers bij de registrar om naar de nameservers die Cloudflare opgeeft. Neem eerst de bestaande records over, vooral de MX- en TXT-records van Google Workspace.
- [ ] Worker → Settings → Domains & Routes: voeg `slaapcongres.nl` toe als custom domain.
- [ ] Voeg `www.slaapcongres.nl` toe en stuur het door naar het domein zonder www, met een Redirect Rule.
- [ ] Zet `indexable: true` in `src/lib/site.ts`. Commit dit op `main`.
- [ ] Direct na de merge: `TURNSTILE_SECRET` als runtime-secret zetten (zie B) en Email Routing op `post.slaapcongres.nl` controleren. Daarna testinzending.
- [ ] Controleer daarna `https://slaapcongres.nl/`: geen meta-noindex en geen X-Robots-Tag.
- [ ] Cloudflare Web Analytics: voeg de site toe en zet het token in `src/lib/site.ts` (`cfAnalyticsToken`).
- [ ] Google Search Console (akkoord Pieter 28 nov, op de livegangdag): maak in het account van Pieter een domeinproperty `slaapcongres.nl` aan. Zet het TXT-record `google-site-verification=…` dat Search Console geeft in de zone slaapcongres.nl in Annicks Cloudflare (DNS → Add record → TXT, naam `@`). Laat de bestaande Google Workspace-TXT staan. Klik op Verify.
- [ ] Search Console → Sitemaps: dien `https://slaapcongres.nl/sitemap-index.xml` in.
- [ ] Search Console → URL-inspectie: `https://slaapcongres.nl/` en `https://slaapcongres.nl/en/` → Indexering aanvragen.
- [ ] robots.txt: controleer dat de regel `Sitemap: https://slaapcongres.nl/sitemap-index.xml` erin staat.
- [ ] Verstuur een testbericht via het contactformulier, in NL en in EN. Controleer of beide adressen het bericht ontvangen en of antwoorden naar de afzender gaat.
- [ ] Controleer de redirects: `/index-en` moet naar `/en/` gaan.
- [ ] Doe een eindcheck op mobiel en desktop: menu, taalwissel, dagtabs in het programma en de ankers.
