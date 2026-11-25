# preview.slaapcongres.nl

Korte previewlink voor Annick, zoals preview.jcc-congress.com. Raakt geen web- of mailrecords van slaapcongres.nl.

Eenmalig in Annicks Cloudflare-account (door Pieter):

1. Workers & Pages > Create > Worker > naam `slaap-preview` > Deploy (Hello World).
2. Edit code: plak `worker.js` uit deze map, Deploy.
3. Settings > Domains & Routes > Add > Custom domain: `preview.slaapcongres.nl`.
   Cloudflare maakt zelf één DNS-record voor `preview`. Bestaande records (A/AAAA/CNAME van de site, MX/TXT van Google) blijven ongemoeid.
4. Controle: https://preview.slaapcongres.nl/ toont de preview, https://slaapcongres.nl/ werkt nog, MX wijst nog naar smtp.google.com.

Andere branch tonen: regel `const BRANCH = '...'` aanpassen en Deploy. Eén preview tegelijk.
