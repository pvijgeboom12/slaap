import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/**
 * Uploads uit Pages CMS staan in src/assets/uploads/ en worden in YAML opgeslagen als
 * "/src/assets/uploads/sponsors/logo.png". Hier zoeken we het bestand op en laten Astro
 * er een geoptimaliseerde versie van maken (WebP, juiste breedte).
 */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/uploads/**/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG}', { eager: true });

export async function upload(path: string | undefined | null, width: number): Promise<{ src: string; width: number; height: number } | null> {
  if (!path) return null;
  const key = path.startsWith('/') ? path : `/${path}`;
  const mod = files[key];
  if (!mod) return { src: path, width, height: width }; // bv. externe URL
  const meta = mod.default;
  if (meta.format === 'svg') return { src: meta.src, width: meta.width, height: meta.height };
  const img = await getImage({ src: meta, width: Math.min(width, meta.width), format: 'webp' });
  return { src: img.src, width: img.attributes.width as number, height: img.attributes.height as number };
}

/* ---------- vaste foto's uit het ontwerp (src/assets/foto) ---------- */

const fotos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/foto/*.jpg', { eager: true });
const widths = [480, 800, 1200, 1600];

/** WebP-varianten met srcset voor een foto uit src/assets/foto. */
export async function foto(name: string) {
  const meta = fotos[`/src/assets/foto/${name}`]?.default;
  if (!meta) throw new Error(`Foto niet gevonden: ${name}`);
  const ws = widths.filter((w) => w < meta.width).concat(meta.width);
  const imgs = await Promise.all(ws.map((w) => getImage({ src: meta, width: w, format: 'webp' })));
  return {
    src: imgs[Math.min(1, imgs.length - 1)].src,
    srcset: imgs.map((im, i) => `${im.src} ${ws[i]}w`).join(', '),
    width: meta.width,
    height: meta.height,
  };
}

/** JPG van 1200 px breed voor Open Graph (delen op LinkedIn, WhatsApp e.d.). */
export async function ogFoto(name: string) {
  const meta = fotos[`/src/assets/foto/${name}`]?.default;
  if (!meta) return undefined;
  return (await getImage({ src: meta, width: 1200, format: 'jpg' })).src;
}
