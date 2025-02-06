export enum PriceType {
  MONTHLY = 'monthly',
  DAILY = 'daily',
  YEARLY = 'yearly',
  CUSTOM = 'custom',
}

export type Property = {
  id: string;
  source: 'telegram' | 'facebook';
  location: string | null;
  city: string | null;
  posted_at: string | null;
  house_type: string | null;
  link: string;
  media_amount: number;
  message_id: number;
  price: number;
  currency: string;
  price_type: PriceType | null;
  rooms: number;
  text: string;
  username: string | null;
  media: {
    url: string;
    alt: string;
  }[];
}

export type Rate = {
  from_iso: string;
  to_iso: string;
  to_amount: number;
}
