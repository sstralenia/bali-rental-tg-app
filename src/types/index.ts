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
  price_type: 'monthly' | 'daily' | 'yearly' | 'custom' | null;
  rooms: number;
  text: string;
  username: string | null;
  media: {
    url: string;
    alt: string;
  }[];
}
