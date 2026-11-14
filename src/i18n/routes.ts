export type Lang = 'nl' | 'en';

/** Paden per pagina en taal. Eén plek om URL's te wijzigen. */
export const routes = {
  home: { nl: '/', en: '/en/' },
  programma: { nl: '/programma/', en: '/en/programme/' },
  registratie: { nl: '/registratie/', en: '/en/registration/' },
  abstracts: { nl: '/abstracts/', en: '/en/abstracts/' },
  praktisch: { nl: '/praktisch/', en: '/en/practical-information/' },
  sponsors: { nl: '/sponsors/', en: '/en/sponsors/' },
  contact: { nl: '/contact/', en: '/en/contact/' },
} as const;

export type RouteKey = keyof typeof routes;

/** Volgorde en labels van het hoofdmenu. */
export const nav: { key: RouteKey; nl: string; en: string }[] = [
  { key: 'programma', nl: 'Programma', en: 'Programme' },
  { key: 'registratie', nl: 'Registratie', en: 'Registration' },
  { key: 'abstracts', nl: 'Abstracts & posters', en: 'Abstracts & posters' },
  { key: 'praktisch', nl: 'Praktisch', en: 'Practical info' },
  { key: 'sponsors', nl: 'Sponsors', en: 'Sponsors' },
  { key: 'contact', nl: 'Contact', en: 'Contact' },
];

/** Pad naar een pagina, eventueel met anker: path('nl', 'praktisch', 'hotel'). */
export function path(lang: Lang, key: RouteKey, hash?: string) {
  return routes[key][lang] + (hash ? `#${hash}` : '');
}
