import { useState } from 'react';
import { Property } from '../types';
import { fetchProperties, Query, Pagination } from '../api';

const defaultProperties = [
  {
    "location": "bukit",
    "created_at": "2024-10-03T06:25:41",
    "house_type": "villa",
    "id": 1051,
    "link": "https://t.me/balichatarenda/571715",
    "media_amount": 6,
    "message_author": null,
    "message_id": 571715,
    "price": 17000000,
    "rooms": 2,
    "text": "",
    "user_id": 6718690923
  },
  {
    "location": "canggu",
    "created_at": "2024-09-28T12:30:15",
    "house_type": "apartment",
    "id": 1052,
    "link": "https://t.me/balichatarenda/571820",
    "media_amount": 3,
    "message_author": "John Doe",
    "message_id": 571820,
    "price": 12000000,
    "rooms": 1,
    "text": "Modern apartment near the beach.",
    "user_id": 6718690800
  },
  {
    "location": "seminyak",
    "created_at": "2024-10-01T09:15:45",
    "house_type": "house",
    "id": 1053,
    "link": "https://t.me/balichatarenda/571925",
    "media_amount": 5,
    "message_author": "Jane Smith",
    "message_id": 571925,
    "price": 25000000,
    "rooms": 3,
    "text": "Spacious house with private pool.",
    "user_id": 6718690701
  }
];

export default function usePropertiesSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const query = async ({ query, pagination }: { query: Query, pagination: Pagination }) => {
    try {
      setIsLoading(true);
      const properties = defaultProperties;//await fetchProperties({ query, pagination });

      setProperties(properties)
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false)
    }
  };

  return { isLoading, properties, query, error };
}
