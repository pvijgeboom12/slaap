# Diensten en toegang

Overzicht van alle diensten achter slaapcongres.nl. Hierin staan geen wachtwoorden. Inloggen gaat per persoon met een eigen account.

Afspraak van 9 november 2026: SLAAP valt onder JCC. Er zijn dus geen aparte accounts. Cloudflare en Workspace lopen via het JCC-account van Annick.

| Dienst | Waarvoor | Eigenaar | Rollen | Kosten |
|---|---|---|---|---|
| GitHub, repo `pvijgeboom12/slaap` | Code en inhoud, elke wijziging is een commit | Pieter (Waterproof Media). Overdracht naar JCC of SSCN in te plannen | Pieter: admin. Annick: schrijfrechten (voor Pages CMS) | €0 |
| Pages CMS (app.pagescms.org) | Beheer van teksten, programma en sponsors | Geen eigen account: inloggen via GitHub | Iedereen met schrijfrechten op de repo | €0 |
| Cloudflare, Workers `slaap` | Hosting, previews per branch, contactformulier | JCC (account Annick) | Annick: Super Administrator. Pieter: Administrator | €0 (gratis plan) |
| Cloudflare DNS, zone `slaapcongres.nl` | Domeinverwijzing | JCC (account Annick) | Als hierboven | €0 |
| Cloudflare Email Routing, `post.jcc-congressen.nl` → `slaap@jcc-congress.com` | Verzenden van formulierberichten | JCC (account Annick) | Als hierboven | €0 |
| Cloudflare Turnstile | Spambeveiliging contactformulier | JCC (account Annick) | Als hierboven | €0 |
| Cloudflare Web Analytics | Bezoekersstatistieken zonder cookies | JCC (account Annick) | Als hierboven | €0 |
| Domeinregistratie `slaapcongres.nl` | Het domein zelf | [registrar en eigenaar invullen] | [invullen] | ca. $11 per jaar |
| Google Workspace, `info@slaapcongres.nl` | Mailbox congres | JCC (Workspace Annick) | Eén beheergebruiker blijft permanent bestaan | €8 per maand |
| Google Search Console | Indexering en sitemap | [eigenaar invullen bij livegang] | Pieter en Annick | €0 |
| Registratie- en abstractplatform | Inschrijven, betalen, abstracts | JCC | Buiten de scope van de website, de site verwijst alleen door | via JCC |

## Geheimen en sleutels

| Naam | Waar het staat | Wie het kan zien |
|---|---|---|
| `TURNSTILE_SECRET` | Cloudflare → Workers → slaap → Settings → Variables and Secrets | Beheerders van het Cloudflare-account |
| Turnstile sitekey (publiek) | `src/lib/site.ts` | Openbaar |
| Web Analytics-token (publiek) | `src/lib/site.ts` | Openbaar |

## Bij overdracht

1. Draag de GitHub-repo over aan het account van JCC of SSCN (Settings → Transfer).
2. Koppel Cloudflare Workers Builds opnieuw aan de overgedragen repo.
3. Controleer of Annick nog schrijfrechten heeft, zodat Pages CMS blijft werken.
