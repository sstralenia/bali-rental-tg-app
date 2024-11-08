import { Property } from '../types';

const MEDIA_TG_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/Bali';
const MEDIA_FB_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/BALI/MarketPlace';

export function mapProperty(p: Property): Property {
  const medialUrl = p.source === 'telegram' ? MEDIA_TG_URL : MEDIA_FB_URL;
  const offset = p.source === 'telegram' ? 1 : 0;
  const media = Array.from({ length: p.media_amount }).map((_, i) => ({
    url: `${medialUrl}/${p.message_id}/${i + offset}.jpeg`,
    alt: `Property ${p.id} image ${i + offset}`,
  }));

  return {
    ...p,
    id: String(p.id),
    media,
  };
}
