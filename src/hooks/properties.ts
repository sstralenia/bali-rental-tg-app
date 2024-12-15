import { useState, useCallback, useContext, useEffect } from 'react';
import { Properties, StoreContext } from '../store';
import { fetchProperties, Query, Pagination } from '../api';
import { FilterValues } from '../pages/search/types';

const ITEMS_PER_PAGE = 10;
const LOOK_FOR_NEIGHBOR_ROOMS_NUMBER = 69;
const ONE_MILLION = 1_000_000;

function buildQueryFromFilters(filters: FilterValues): Query {
  const query: Partial<Query> = {};

  query.location = filters.location ?? undefined;
  query.priceFrom = filters.priceFrom ? parseFloat(filters.priceFrom) * ONE_MILLION : undefined;
  query.priceTo = filters.priceTo ? parseFloat(filters.priceTo) * ONE_MILLION : undefined;

  if (filters.isLookForNeighboor) {
    query.roomsFrom = LOOK_FOR_NEIGHBOR_ROOMS_NUMBER;
    query.roomsTo = LOOK_FOR_NEIGHBOR_ROOMS_NUMBER;
  } else {
    switch(filters.room) {
      case '1':
      case '2':
      case '3':
        query.roomsFrom = parseInt(filters.room);
        query.roomsTo = parseInt(filters.room);
        break;
      case '4+':
        query.roomsFrom = 4;
        break;
    }
  }

  return query;
}

export default function usePropertiesSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    filters,
    setFilters,
    properties: storedProperties,
    setProperties: setStoredProperties
  } = useContext(StoreContext);
  const [error, setError] = useState<Error | null>(null);

  const query = useCallback(async ({ query, page }: { query: Query, page: number }) => {
    try {
      setIsLoading(true);

      const pagination: Pagination = {
        page,
        perPage: ITEMS_PER_PAGE,
      };
      const { properties, total } = await fetchProperties({ query, pagination });

      if (pagination.page === 1) {
        setStoredProperties(prev => ({
          ...prev,
          items: properties,
          totalItems: total,
          page: pagination.page,
        }));
      } else {
        setStoredProperties(prev => {
          const existedItems = new Set(prev.items.map(item => item.id));
          const newItems = properties.filter(item => !existedItems.has(item.id));

          return {
            ...prev,
            items: [...prev.items, ...newItems],
            totalItems: total,
            page: pagination.page,
          };
        });
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false)
    }
  }, [storedProperties]);

  useEffect(() => {
    query({ query: buildQueryFromFilters(filters), page: storedProperties.page });
  }, [storedProperties.page]);

  const nextPage = useCallback(() => {
    setStoredProperties((prev: Properties) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, [setStoredProperties]);

  const applyFilters = useCallback((filters: FilterValues) => {
    setFilters(filters);
    query({ query: buildQueryFromFilters(filters), page: 1 });
  }, [setFilters, query]);

  return {
    isLoading,
    properties: storedProperties.items,
    nextPage,
    error,
    activePage: storedProperties.page,
    totalItems: storedProperties.totalItems,
    filters,
    applyFilters,
  };
}
