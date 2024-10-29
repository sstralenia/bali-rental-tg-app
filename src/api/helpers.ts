import { Property } from '../types';

const MEDIA_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/Bali';

export function mapProperty(p: Property): Property {
  const media = Array.from({ length: p.media_amount }).map((_, i) => ({
    url: `${MEDIA_URL}/${p.message_id}/${i + 1}.jpeg`,
    alt: `Property ${p.id} image ${i + 1}`,
  }));

  return {
    ...p,
    id: String(p.id),
    media,
  };
}
