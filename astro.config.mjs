// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { appendFileSync } from 'node:fs';
import { site } from './src/lib/site.ts';

/**
 * Eén schakelaar voor indexeren: `indexable` in src/lib/site.ts.
 * false → elke pagina krijgt <meta robots noindex> én de header X-Robots-Tag.
 * Previews op *.workers.dev krijgen altijd noindex, ook na livegang.
 */
const robotsHeaders = {
  name: 'robots-headers',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const file = new URL('_headers', dir);
      let rules = '\n# Previews nooit indexeren\nhttps://:sub.:account.workers.dev/*\n  X-Robots-Tag: noindex, nofollow\n';
      if (!site.indexable) rules += '\n# Site nog niet live: niets indexeren\n/*\n  X-Robots-Tag: noindex, nofollow\n';
      appendFileSync(file, rules);
    },
  },
};

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'nl', locales: { nl: 'nl-NL', en: 'en-GB' } },
      filter: (page) => !page.includes('/404'),
    }),
    robotsHeaders,
  ],
});
