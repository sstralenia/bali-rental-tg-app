export type Property = {
  id: string;
  location: string;
  created_at: string;
  house_type: string;
  link: string;
  media_amount: number;
  message_author: string | null;
  message_id: number;
  price: number;
  rooms: number;
  text: string;
  user_id: number;
  media: {
    url: string;
    alt: string;
  }[];
}