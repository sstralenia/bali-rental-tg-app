import { useState, useCallback } from 'react';
import { Property } from '../types';
import { fetchProperties, Query, Pagination } from '../api';

export default function usePropertiesSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);

  const query = useCallback(async ({ query, pagination }: { query: Query, pagination: Pagination }) => {
    try {
      setIsLoading(true);
      const { properties, total } = await fetchProperties({ query, pagination });

      setProperties(prev => {
        if (pagination.page === 1) {
          return properties;
        }

        return [...prev, ...properties];
      })
      setTotalItems(total);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setProperties, setError]);

  // const queryNext = useCallback(async ({ query, pagination }: { query: Query, pagination: Pagination }) => {
  //   try {
  //     setIsLoading(true);
  //     const { properties: nextProperties, total: nextTotal } = await fetchProperties({ query, pagination });

  //     setProperties(properties => [...properties, ...nextProperties]);
  //     setTotalItems(nextTotal);
  //   } catch (err) {
  //     setError(err as Error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [setIsLoading, setProperties, setError]);

  return { isLoading, properties, query, error, totalItems };
}
