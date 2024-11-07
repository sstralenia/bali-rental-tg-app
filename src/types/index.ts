export type Property = {
  id: string;
  source: 'telegram' | 'facebook';
  location: string | null;
  posted_at: string | null;
  house_type: string | null;
  link: string;
  media_amount: number;
  message_id: number;
  price: number;
  rooms: number;
  text: string;
  username: string | null;
  media: {
    url: string;
    alt: string;
  }[];
}
