/**
 * Technische instellingen van de site.
 * Inhoud (datums, teksten, programma) komt in stap 3 in src/content/ en is dan via Pages CMS te beheren.
 */
export const site = {
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
  turnstileSiteKey: '',
};
