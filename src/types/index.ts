export type Property = {
  id: string;
  location: string;
  created_at: string | null;
  updated_at?: string | null;
  house_type: string;
  link: string;
  media_amount: number;
  message_author: string | null;
  message_id: number;
  price: number;
  rooms: number;
  text: string;
  user_id: number;
  user: {
    user_name: string;
  }
  media: {
    url: string;
    alt: string;
  }[];
}
