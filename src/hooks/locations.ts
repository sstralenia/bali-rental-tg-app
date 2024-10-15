import { useEffect, useState } from 'react';
import { fetchLocations } from '../api';

export default function useLocations() {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const locations = await fetchLocations();

        setLocations(locations);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, locations };
}