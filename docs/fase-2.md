# Van fase 1 (save the date) naar de volledige site

Fase 1 toont alleen de homepage (intro, datum, locatie, Call for Symposia) en Contact.
De overige pagina's zijn klaar maar worden niet gebouwd: ze staan in `src/pages/_later/`
(Astro slaat mappen met een `_` over).

Overstappen naar de volledige site:

1. Zet in `src/lib/site.ts` `fase: 2`.
2. Verplaats de bestanden terug en zet de importpaden goed:
   ```sh
   git mv src/pages/_later/en/*.astro src/pages/en/
   git mv src/pages/_later/*.astro src/pages/
   sed -i "s#'\.\./\.\./components#'../components#" src/pages/*.astro
   sed -i "s#'\.\./\.\./\.\./components#'../../components#" src/pages/en/*.astro
   ```
3. `npm run build` moet weer 15 pagina's opleveren.
4. Loop de teksten van Home, Programma en Registratie na: die gaan nog uit van de oude opzet.
   Het programma heeft nog drie dagen; het congres is 11 en 12 november 2027.
