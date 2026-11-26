# Beheerinstructie slaapcongres.nl

Voor Annick. Zo pas je de website zelf aan.

## Inloggen

1. Ga naar https://app.pagescms.org.
2. Klik op **Sign in with GitHub**. Log in met je eigen GitHub-account.
3. Kies de repository **slaap**.

Lukt het niet? Vraag Pieter om je toegang te geven tot de repository.

## Zo is het opgebouwd

Links zie je een menu. Bovenaan staan de onderdelen die je het vaakst aanpast:

- **Instellingen congres**: datums, status van registratie en abstracts, links en PDF's.
- **Programma**: dagen en sessies, en het congresdiner.
- **Sprekers**: de uitgelichte sprekers op de programmapagina.
- **Sponsors**: logo's per niveau.
- **Organisatiecomité**: namen en functies.
- **Accreditatie**: punten per beroepsvereniging.

Daaronder staan de teksten per pagina, apart voor Nederlands (NL) en Engels (EN).

## Open plekken en codes

Tekst tussen vierkante haken, zoals `[datum]`, zie je op de site als gele markering. Zo zie je wat nog ingevuld moet worden. Typ de echte tekst eroverheen en de markering verdwijnt.

Sommige teksten bevatten een code tussen accolades, zoals `{deadline_abstracts}`. Daar komt automatisch de datum uit **Instellingen congres**. Je vult een datum dus maar op één plek in. Laat de code staan.

Een link maak je zo: `[tekst die je ziet](https://www.voorbeeld.nl)`.

## Programma aanpassen

1. Open **Programma**.
2. Klik op een dag en daarna op een sessie.
3. Vul de tijd in, bijvoorbeeld `09.00–10.30`. Kies het soort sessie, vul de titel in het Nederlands en Engels in, en vul de zaal in.
4. Sprekers en voorzitter zijn niet verplicht. Vul je ze in, dan staan ze onder de titel.
5. Klik op **Save**.

Een sessie toevoegen doe je met **Add an entry**. De volgorde verander je door te slepen.

## Sponsors toevoegen

1. Open **Sponsors** en klik op **Add an entry**.
2. Vul de naam in en kies het niveau: Platinum, Goud, Zilver of Exposant.
3. Upload het logo. Een SVG of een PNG met een doorzichtige achtergrond werkt het best.
4. Vul de website van de sponsor in.
5. Klik op **Save**.

Zolang een niveau geen sponsors heeft, toont de site lege tegels met `[Logo]`. Het blok Exposanten verschijnt pas als er een exposant is. Platinum-sponsors staan ook op de homepage.

## Registratie openen en sluiten

1. Open **Instellingen congres** en ga naar **Registratie**.
2. Kies bij **Status**:
   - **Binnenkort**: de site toont de openingsdatum. Vul die in bij **Registratie opent op**.
   - **Open**: de knoppen gaan naar het registratieplatform. Vul eerst de links in.
   - **Gesloten**: de site toont een korte melding.
3. Klik op **Save**.

Voor abstracts werkt het hetzelfde, onder **Abstracts**.

## Een PDF plaatsen

1. Open **Instellingen congres** en ga naar **Downloads (PDF)**.
2. Upload het bestand bij het juiste veld, bijvoorbeeld **Programma**.
3. Klik op **Save**. De knop op de site gaat nu naar je PDF.

## Bekijken en publiceren

Elke keer dat je op **Save** klikt, wordt de wijziging opgeslagen. Werk je in de branch **main**, dan staat de wijziging na 2 à 4 minuten live op slaapcongres.nl.

Wil je eerst kijken voordat het live gaat?

1. Kies bovenaan in Pages CMS de branch **concept**. Bestaat die nog niet? Vraag Pieter om hem aan te maken.
2. Doe je wijzigingen en klik op **Save**.
3. Na een paar minuten staat er een preview op het preview-adres dat Pieter je heeft gegeven.
4. Klopt alles? Vraag Pieter om de wijzigingen te publiceren. Je kunt het ook zelf doen op GitHub, met een pull request van **concept** naar **main**.

Kleine tekstaanpassingen kun je gerust direct in **main** doen.

## Zoekmachines

Elke pagina heeft bovenaan het blok **Zoekmachines (Google)**. De titel en omschrijving zie je terug in Google. Houd de omschrijving tussen 120 en 160 tekens.

## Hulp nodig?

Neem contact op met Pieter Vijgeboom, Waterproof Media.
