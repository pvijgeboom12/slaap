# SLAAP2027 – slaapcongres.nl

Website van SLAAP2027, het tweejaarlijkse Nederlands Slaapcongres (10 t/m 12 november 2027, NH Koningshof, Veldhoven).
Eigenaar: Stichting Slaapcongres Nederland. Opdrachtgever: JCC Congress Consultancy & Events. Bouw: Waterproof Media.

Zelfde opzet als de JCC-site: Astro (statisch), Cloudflare Workers met static assets, Pages CMS voor beheer. Geen database.

## Lokaal draaien

Node 22.23 of hoger (zie `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321, ververst bij elke wijziging
npm run build      # bouwt naar dist/
npx wrangler dev   # dist/ + het contactformulier (/api/contact) zoals op Cloudflare
```

Mail wordt lokaal niet echt verstuurd: wrangler schrijft het bericht als `.eml` naar `.wrangler/tmp/email/`.
Wil je Turnstile lokaal testen, zet dan in `.dev.vars` (staat in `.gitignore`):

```
TURNSTILE_SECRET=1x0000000000000000000000000000000AA   # testsleutel: altijd goedgekeurd
```

## Deploy

Cloudflare Workers Builds, gekoppeld aan deze GitHub-repo:

| Instelling | Waarde |
|---|---|
| Build command | `npm run build` |
| Deploy command (main) | `npx wrangler deploy` |
| Deploy command (andere branches) | `npx wrangler versions upload` |

Branch `main` is productie. Elke andere branch geeft een preview-URL op `*.workers.dev`. Die krijgt altijd noindex.
Een wijziging via Pages CMS is een commit. Op `main` staat die na 2 à 4 minuten live.

## Omgevingsvariabelen en geheimen

| Naam | Waar | Waarde |
|---|---|---|
| `CONTACT_FROM` | `wrangler.jsonc` (vars) | `formulier@post.slaapcongres.nl` |
| `CONTACT_TO` | `wrangler.jsonc` (vars) | Ontvangers, kommagescheiden. Nu `info@jcc-congress.com` |
| `TURNSTILE_SECRET` | Cloudflare-dashboard → Worker → Settings → Variables and Secrets (type Secret) | Geheime sleutel van de Turnstile-widget |
| `MAIL` | `wrangler.jsonc` (send_email-binding) | Cloudflare Email Routing |

Publieke instellingen staan in `src/lib/site.ts`:

- `indexable` – de livegang-schakelaar. `false` = noindex via de meta-tag én de X-Robots-Tag-header.
- `turnstileSiteKey` – de publieke sitekey van Turnstile. Leeg betekent geen widget.
- `cfAnalyticsToken` – het token van Cloudflare Web Analytics (cookieloos). Leeg betekent geen analytics.

Zet nooit geheimen in de repository.

## Mapstructuur

```
src/
  content/                 ← alles wat Pages CMS beheert (YAML)
    settings.yml           instellingen: datums, status registratie/abstracts, links, PDF's
    programma.yml          dagen en sessies, congresdiner
    sprekers.yml           uitgelichte sprekers
    sponsors.yml           sponsors per niveau (platinum, goud, zilver, exposant)
    comite.yml             organisatiecomité
    accreditatie.yml       punten per beroepsvereniging
    pages/nl/*.yml         teksten per pagina, Nederlands
    pages/en/*.yml         teksten per pagina, Engels
  components/pages/        één template per pagina, voor NL en EN
  components/              Header, Footer, R (tekst), StatusGate, SponsorTiles, Photo, EventJsonLd
  i18n/routes.ts           URL's per pagina en taal (taalwissel en hreflang)
  lib/content.ts           inlezen van YAML, datums, open plekken, codes
  lib/images.ts            WebP en srcset voor foto's en uploads
  assets/foto/             vaste foto's uit het ontwerp
  assets/uploads/          uploads via Pages CMS (sponsors/, sprekers/)
  styles/site.css          CSS uit het ontwerp
  pages/                   routes (NL op /, EN onder /en/)
public/                    _headers, _redirects, robots.txt, SVG-logo's, downloads/ (PDF's)
worker/index.js            /api/contact (Turnstile, validatie, honeypot, Email Routing)
.pages.yml                 configuratie Pages CMS
docs/                      inventaris, beheerinstructie, diensten en toegang, livegang
```

## Hoe de inhoud werkt

- Een tekstveld mag `[open plek]` bevatten. Dat wordt een gele markering, zoals in het ontwerp.
- `[tekst](https://…)` wordt een link, `**tekst**` wordt vet.
- Codes zoals `{deadline_abstracts}` vullen een datum uit `settings.yml` in. Is die datum leeg, dan staat er `[datum]`. Alle codes staan in `tokens()` in `src/lib/content.ts`.
- De status van registratie en abstracts (`binnenkort`, `open`, `gesloten`) bepaalt of er knoppen naar het JCC-platform staan, een openingsdatum of een melding (`StatusGate.astro`).
- Lege lijsten tonen placeholders: lege logotegels per sponsorniveau, `[Naam]` bij het comité.

### Pages CMS-velden voor teksten opnieuw genereren

Voeg je een veld toe aan een `pages/*.yml`? Dan genereer je de velden voor Pages CMS opnieuw. Gebruik daarvoor `python3 scripts/gen-pages-yml.py .` (vereist PyYAML) en plak de uitvoer onder "Teksten per pagina en taal" in `.pages.yml`, of pas `.pages.yml` met de hand aan. Het blok onder "Teksten per pagina en taal" volgt de structuur van de YAML-bestanden.

### Een pagina toevoegen

1. Voeg de route toe in `src/i18n/routes.ts` (en in `nav` als hij in het menu moet).
2. Maak `src/components/pages/Naam.astro` en `src/content/pages/{nl,en}/naam.yml`.
3. Maak de routebestanden in `src/pages/` en `src/pages/en/`.
4. Voeg het tekstbestand toe aan `.pages.yml`.

## Controle

- `npm run build` moet zonder fouten draaien.
- Lighthouse mobiel (nov 2026): performance 99–100, toegankelijkheid 100, best practices 100. SEO is 69 alleen door de noindex.
- Het ontwerp is per pagina met screenshots vergeleken met slaap2027.netlify.app, op desktop en mobiel.
