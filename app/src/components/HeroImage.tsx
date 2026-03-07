import Image from 'next/image';
import manifest from '../../public/images/pseo/manifest.json';

type ManifestImage = {
  src: string; alt: string; title: string; caption: string;
  width: number; height: number; format: string; size_bytes: number;
  placement: string; loading: string; schema: Record<string, unknown>;
};
type ManifestEntry = { url: string; title: string; images: ManifestImage[]; };
const mediaManifest = manifest as Record<string, ManifestEntry>;

export function HeroImage({ slug }: { slug: string }) {
  const entry = mediaManifest[slug];
  if (!entry?.images?.length) return null;
  const img = entry.images[0];
  return (
    <figure className="mb-8 -mx-4 sm:mx-0 sm:rounded-xl overflow-hidden">
      <Image src={img.src} alt={img.alt} title={img.title}
        width={img.width} height={img.height}
        priority={img.loading === 'eager'}
        className="w-full h-auto" sizes="(max-width: 768px) 100vw, 768px" />
      {img.caption && (
        <figcaption className="px-4 py-2 text-xs text-gray-500 bg-gray-50 sm:rounded-b-xl">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function getOgImage(slug: string) {
  const entry = mediaManifest[slug];
  if (!entry?.images?.length) return null;
  const img = entry.images[0];
  return { url: img.src, width: img.width, height: img.height, alt: img.alt };
}

export function getImageSchema(slug: string) {
  const entry = mediaManifest[slug];
  if (!entry?.images?.length) return null;
  return entry.images[0].schema;
}
