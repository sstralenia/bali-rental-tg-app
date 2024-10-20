import { useState, useCallback } from 'react';
import { Property } from '../types';
import { fetchProperty } from '../api';

export default function useProperty() {
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const query = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const property = await fetchProperty(id);

      setProperty(property)
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setProperty, setError]);

  return { isLoading, property, query, error };
}
