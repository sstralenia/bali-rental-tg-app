import { Property } from '../types';

const MEDIA_TG_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/Bali';
const MEDIA_FB_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/BALI/MarketPlace';

export function mapProperty(p: Property): Property {
  const medialUrl = p.source === 'telegram' ? MEDIA_TG_URL : MEDIA_FB_URL;
  const media = Array.from({ length: p.media_amount }).map((_, i) => ({
    url: `${medialUrl}/${p.message_id}/${i + 1}.jpeg`,
    alt: `Property ${p.id} image ${i + 1}`,
  }));

  return {
    ...p,
    id: String(p.id),
    media,
  };
}
