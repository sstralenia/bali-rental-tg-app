import { Property } from '../types';

const MEDIA_TG_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/Bali';
const MEDIA_FB_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/BALI/MarketPlace';

export function mapProperty(p: Property): Property {
  const [medialUrl, offset, extension] = p.source === 'telegram'
    ? [MEDIA_TG_URL, 1, 'jpeg']
    : [MEDIA_FB_URL, 0, 'jpg'];

  const media = Array.from({ length: p.media_amount }).map((_, i) => ({
    url: `${medialUrl}/${p.message_id}/${i + offset}.${extension}`,
    alt: `Property ${p.id} image ${i + offset}`,
  }));

  return {
    ...p,
    id: String(p.id),
    media,
  };
}
