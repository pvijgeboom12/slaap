# Inventaris SLAAP2027 – stap 1

Bron: https://slaap2027.netlify.app/ (opgehaald 14 november 2026). Kopie van alle HTML en assets staat in `bron/`.

## Pagina's

| Pagina | Huidig pad | NL | EN | Ankers |
|---|---|---|---|---|
| Home | `/` en `/index-en` | ja | ja | – |
| Programma | `/programma` | ja | nee | `#overzicht`, `#sprekers`, `#posters`, `#congresdiner` |
| Registratie | `/registratie` | ja | nee | `#lid-worden` |
| Abstracts & posters | `/abstracts` | ja | nee | `#richtlijnen`, `#posters`, `#data-blitz`, `#prijzen` |
| Praktisch | `/praktisch` | ja | nee | `#locatie`, `#hotel`, `#route`, `#accreditatie` |
| Sponsors | `/sponsors` | ja | nee | – |
| Contact | `/contact` | ja | nee | – |

Alleen de homepage bestaat in het Engels. De Engelse navigatie en footer linken naar de Nederlandse subpagina's, met Engelse labels.

## Open plekken per pagina

**Home (NL/EN)**: openingsdatum registratie en abstracts `[datum]` (3x), organisatiecomité 5x `[Naam]` + `[Functie, instelling]`, platinum sponsors 4x `[Logo]`.

**Programma**: `[maand]`, per sessie `[tijd]` en `[zaal]`/`[zalen]`, drie keynotes `[titel], [spreker]`, vier uitgelichte sprekers (`[Naam spreker]`, `[Functie, instelling]`, `[Titel lezing]`), posteroverzicht `[dag] [datum] [tijd] [zaal]`, congresdiner `[bedrag]`.

**Registratie**: drie deadlines `[datum]`, negen tarieven `[bedrag]`, btw `[inclusief / exclusief]`.

**Abstracts & posters**: deadlines `[datum]` (4x), posterreceptie `[zaal]`, `[dag en datum]`, ophang- en verwijdertijden `[dag]`/`[tijd]`, Data Blitz `[tijd]`, prijsuitreiking `[datum en locatie]`.

**Praktisch**: `[Kaart]`, `[Routebeschrijving en parkeerinformatie]`, `[Bus- of taxiverbinding naar Koningshof]`, accreditatiepunten 7x `[n]`.

**Sponsors**: 18 logotegels `[Logo]` (platinum, gold, silver), `[naam contactpersoon]`.

**Contact**: geen open plekken.

## Programma-opbouw

Drie dagtabs (wo 10, do 11, vr 12 november 2027). Sessietypen in het ontwerp: Keynote, Symposia, Posters (inclusief Data Blitz), Plenair (registratie, pauzes, afsluiting) en Sociaal (diner). Per sessie: tijd, type, titel, zaal.

## Links zonder bestemming (`href="#"`)

| Pagina | Knop | Wordt |
|---|---|---|
| Abstracts | Abstract indienen (2x), Symposium voorstellen | JCC-abstractplatform, via status in `settings.yml` |
| Abstracts | Voorwaarden (PDF) | PDF nodig |
| Registratie | Individueel registreren, Groepsregistratie (2x) | JCC-registratieplatform, via status |
| Registratie | Algemene voorwaarden (PDF) | PDF nodig |
| Programma | Programma (PDF), Posteroverzicht (PDF) | PDF's nodig |
| Programma | Ticket bestellen (congresdiner) | registratieplatform JCC? |
| Praktisch | Hotelkamer boeken | boekingslink NH nodig |
| Alle pagina's (footer) | Algemene voorwaarden, Privacyverklaring | pagina of PDF nodig, staat op de livegang-checklist |

## Externe links

nswo.nl, nswo.nl/word-lid/, slaapgeneeskundevereniging.nl, slaapgeneeskundevereniging.nl/svnl/lid-worden/, cgr.nl, nh-hotels.com (Koningshof), twee Google Maps-links naar Locht 117 Veldhoven, tel. +31 40 253 74 75, nhkoningshof@nh-hotels.com, info@jcc-congressen.nl (ook met onderwerp "Sponsoring SLAAP2027").

## Assets

Twee SVG's (beeldmerk, woordmerk donker) en 15 JPG-foto's van SLAAP2025, 1400×933 px, samen circa 3 MB. Fonts: Archivo via Google Fonts.

## Technische bevindingen

- Eén CSS-blok van 7,6 kB staat in elke pagina gekopieerd; daarnaast 52 tot 169 inline styles per pagina. Ik zet het CSS-blok in één bestand en laat de inline styles staan, zodat het ontwerp gelijk blijft.
- Het contactformulier opent nu de mailapp van de bezoeker (mailto). Dat wordt de Pages Function met Turnstile.
- Netlify-script en -commentaar worden verwijderd.
- Geen meta descriptions, geen canonical, geen Open Graph, geen JSON-LD. Wel overal `noindex, nofollow`.
- `<img>` declareert 1920×1280, het bestand is 1400×933. Zelfde verhouding, dus geen verspringing; ik genereer WebP-varianten.
- Kopstructuur is in orde. De H1 op de homepage is het woordmerk met alt-tekst "SLAAP2027".

## Punten om te beslissen

1. **Eleventy of Astro.** De bouwprompt zegt Eleventy. In de afspraken van 10 november is het gedeelde Astro-sjabloon (zoals JCC) het standaardmodel voor Waterproofmedia-sites. Kiezen we Astro, dan blijft de rest van de opzet hetzelfde.
2. **Engelse subpagina's.** Alleen de homepage is vertaald. Zes pagina's moeten nog naar het Engels. Voorstel: ik maak een conceptvertaling, JCC of het comité controleert.
3. **Ontvangstadres contactformulier.** De site noemt info@jcc-congressen.nl. Eerder is info@slaapcongres.nl afgesproken. Welk adres ontvangt de berichten?
4. **Sessietypen.** De prompt noemt keynote, symposium, posters/Data Blitz, pauze, diner. Het ontwerp kent Keynote, Symposia, Posters, Plenair en Sociaal. Voorstel: ontwerplabels aanhouden, pauze valt onder Plenair en diner onder Sociaal.
5. **Sponsorniveaus.** De NL-pagina gebruikt Engelse koppen "Gold sponsors" en "Silver sponsors". Exposant komt in het ontwerp niet voor. Voorstel: NL-koppen Goud en Zilver, en een exposantenblok dat alleen verschijnt als er exposanten zijn (zelfde tegelstijl).
6. **Repository en accounts.** De prompt zegt een GitHub-repo van SSCN; op 9 november is besloten dat SLAAP onder JCC valt (Cloudflare van Annick). Onder welk GitHub-account komt de repo?
7. **Google Fonts.** Voorstel: Archivo zelf hosten. Zelfde letter, geen verzoek naar Google, beter voor de privacyverklaring.

## Wat ik nodig heb van JCC

PDF's (programma, posteroverzicht, voorwaarden registratie en abstracts), links naar het registratie- en abstractplatform, hotelboekingslink, privacyverklaring en algemene voorwaarden, en daarna de inhoud voor de open plekken. Die laatste kan Annick zelf invullen via Pages CMS.
