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
