/**
 * Technische instellingen van de site.
 * Inhoud (datums, teksten, programma) komt in stap 3 in src/content/ en is dan via Pages CMS te beheren.
 */
export const site = {
  url: 'https://slaapcongres.nl',
  /**
   * Livegang-schakelaar. false = elke pagina krijgt noindex (en _headers stuurt X-Robots-Tag).
   * Bij livegang op true zetten én de X-Robots-Tag-regel in public/_headers weghalen.
   * Previews op *.pages.dev / *.workers.dev blijven altijd noindex via _headers.
   */
  indexable: false,
  /** Cloudflare Web Analytics-token (cookieloos). Leeg = geen analytics. */
  cfAnalyticsToken: '',
};
