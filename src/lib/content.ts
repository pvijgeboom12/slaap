import fs from 'node:fs';
import path from 'node:path';
import { load as yamlLoad, JSON_SCHEMA } from 'js-yaml';
import type { Lang } from '../i18n/routes';

/**
 * Leest de YAML-bestanden in src/content/. Die bestanden worden beheerd via Pages CMS.
 * Alles wordt bij de build ingelezen; er is geen database.
 */
const dir = path.resolve('src/content');
function load<T = any>(file: string): T {
  return yamlLoad(fs.readFileSync(path.join(dir, file), 'utf8'), { schema: JSON_SCHEMA }) as T;
}

export type L10n = { nl?: string; en?: string };

export const settings = () => load<any>('settings.yml');
export const programma = () => load<any>('programma.yml');
export const sprekers = () => load<any>('sprekers.yml')?.sprekers ?? [];
export const sponsors = () => load<any>('sponsors.yml')?.sponsors ?? [];
export const comite = () => load<any>('comite.yml')?.leden ?? [];
export const accreditatie = () => load<any>('accreditatie.yml')?.verenigingen ?? [];
/** Paginateksten. Ontbreekt de Engelse versie nog, dan valt de pagina terug op de Nederlandse tekst. */
export const page = (lang: Lang, name: string) =>
  load<any>(fs.existsSync(path.join(dir, `pages/${lang}/${name}.yml`)) ? `pages/${lang}/${name}.yml` : `pages/nl/${name}.yml`);

/** Tekst in de juiste taal uit een { nl, en }-veld (of een gewone string). */
export function tr(v: L10n | string | undefined | null, lang: Lang): string {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  return v[lang] ?? '';
}

/* ---------- datums ---------- */

const months = {
  nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
const days = {
  nl: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export function toDate(v: unknown): Date | null {
  if (!v) return null;
  const d = new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
}

/** "10 november 2027" / "10 November 2027" */
export function fmtDate(v: unknown, lang: Lang): string {
  const d = toDate(v);
  return d ? `${d.getUTCDate()} ${months[lang][d.getUTCMonth()]} ${d.getUTCFullYear()}` : '';
}
export const dayName = (d: Date, lang: Lang) => days[lang][d.getUTCDay()];
export const monthName = (d: Date, lang: Lang) => months[lang][d.getUTCMonth()];
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "11 en 12 november 2027" / "11 and 12 November 2027" (of "10 t/m 12 ..." bij drie dagen). */
export function congresdatum(lang: Lang): string {
  const c = settings().congres ?? {};
  const a = toDate(c.startdatum), b = toDate(c.einddatum) ?? a;
  if (!a || !b) return '';
  const m = (d: Date) => `${months[lang][d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  if (a.getTime() === b.getTime()) return fmtDate(a, lang);
  const days = Math.round((b.getTime() - a.getTime()) / 86400000) + 1;
  const join = days === 2 ? (lang === 'nl' ? ' en ' : ' and ') : (lang === 'nl' ? ' t/m ' : ' to ');
  if (a.getUTCMonth() === b.getUTCMonth()) return `${a.getUTCDate()}${join}${b.getUTCDate()} ${m(b)}`;
  return `${a.getUTCDate()} ${months[lang][a.getUTCMonth()]}${join}${fmtDate(b, lang)}`;
}

/* ---------- tekst met open plekken ---------- */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const PH = (label: string) => `<em class="ph">${esc(label)}</em>`;

/** Codes die in teksten vervangen worden door een waarde uit de instellingen. */
export function tokens(lang: Lang): Record<string, string> {
  const s = settings();
  const date = (v: unknown, ph = lang === 'nl' ? '[datum]' : '[date]') => fmtDate(v, lang) || ph;
  return {
    opening_registratie: date(s.registratie?.opent_op),
    vroegboek_tot: date(s.registratie?.vroegboek_tot),
    opening_abstracts: date(s.abstracts?.opent_op),
    deadline_abstracts: date(s.abstracts?.deadline_abstracts),
    deadline_symposia: date(s.abstracts?.deadline_symposia),
    bericht_acceptatie: date(s.abstracts?.bericht_acceptatie),
    contactpersoon_sponsoring: s.contact?.sponsoring_contactpersoon || (lang === 'nl' ? '[naam contactpersoon]' : '[contact name]'),
    deelnemers: String(s.congres?.verwachte_deelnemers ?? ''),
    congresdatum: congresdatum(lang),
    locatie: [s.congres?.locatie_kort || s.congres?.locatie, s.congres?.plaats].filter(Boolean).join(', '),
  };
}

/**
 * Zet een tekstveld om naar HTML:
 * - {code}         → waarde uit de instellingen (zie tokens)
 * - [tekst](url)   → link
 * - **tekst**      → vet
 * - [tekst]        → gele open plek
 * - lege regel     → nieuwe alinea is aan de template; enkele regelovergang → <br>
 */
export function rich(text: unknown, lang: Lang): string {
  if (text == null || text === '') return '';
  let s = esc(String(text).trim());
  const t = tokens(lang);
  s = s.replace(/\{([a-z_]+)\}/g, (m, k) => (k in t ? esc(t[k]) : m));
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) => `<a href="${url}">${label}</a>`);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]<>]{1,60})\]/g, '<em class="ph">[$1]</em>');
  s = s.replace(/\n/g, '<br>');
  return s;
}

/** Waarde, of een open plek als die nog leeg is. */
export function orPh(value: unknown, label: string): string {
  return value != null && value !== '' ? esc(String(value)) : PH(label);
}
