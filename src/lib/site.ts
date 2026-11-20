/**
 * Technische instellingen van de site.
 * Inhoud (datums, teksten, programma) komt in stap 3 in src/content/ en is dan via Pages CMS te beheren.
 */
export const site = {
  /**
   * Fase van de site.
   * 1 = save the date: alleen de homepage (intro, datum, locatie, Call for Symposia) en Contact.
   *     De overige pagina's staan klaar in src/pages/_later/ en worden niet gebouwd.
   * 2 = volledige site. Zet hier 2 en verplaats de pagina's uit src/pages/_later/ terug (zie docs/fase-2.md).
   */
  fase: 1 as 1 | 2,
  url: 'https://slaapcongres.nl',
  /**
   * Livegang-schakelaar. false = elke pagina krijgt noindex (meta-tag én X-Robots-Tag-header).
   * Bij livegang op true zetten; verder hoeft er niets te veranderen.
   * Previews op *.workers.dev blijven altijd noindex (zie astro.config.mjs).
   */
  indexable: false,
  /** Cloudflare Web Analytics-token (cookieloos). Leeg = geen analytics. */
  cfAnalyticsToken: '',
  /**
   * Cloudflare Turnstile (spamcheck contactformulier), publieke sitekey.
   * Leeg = geen widget (handig lokaal). De geheime sleutel staat alleen in Cloudflare (TURNSTILE_SECRET).
   */
  turnstileSiteKey: '0x4AAAAAAGKZctKxP9pYW39Q',
};
