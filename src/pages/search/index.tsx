import { useEffect, useState, memo, useMemo, useCallback, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  Container,
  Loader,
  Center,
  Text,
  LoadingOverlay
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Query } from '../../api';
import PropertyList from '../../components/property-list';
import usePropertiesSearch from '../../hooks/properties';
import useAnalytics from '../../hooks/analytics';
import { useRouter } from '../../hooks/router';
import { FilterValues } from './types';
import FiltersButton from './filters-button';
import FiltersModal from './filters-modal';

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

function SearchPage() {
  const [activePage, setPage] = useState(1);
  const { query: queryProperties, totalItems, properties, isLoading } = usePropertiesSearch();
  const [filters, setFilters] = useState<FilterValues>({
    location: null,
    priceFrom: null,
    priceTo: null,
    isLookForNeighboor: false,
    room: null,
  });
  const [isFiltersModalsOpened, { open: openFiltersModal, close: closeFiltersModal }] = useDisclosure(false);
  const { track } = useAnalytics();
  const { navigate } = useRouter();
  const containerRef = useRef<HTMLElement | null>(null);

  const handleFiltersApply = useCallback((filters: FilterValues) => {
    setFilters(filters);
    setPage(1);
    track('filters_applied', { ...filters });
    closeFiltersModal();
  }, [setFilters, setPage, closeFiltersModal, track]);

  const fetchData = useCallback(() => setPage((page) => page + 1), [setPage]);

  console.log('Render seach page', properties.length, activePage);

  useEffect(() => {
    const query = buildQueryFromFilters(filters);
    queryProperties({
      query,
      pagination: { page: activePage, perPage: ITEMS_PER_PAGE }
    });
  }, [queryProperties, activePage, filters]);

  const filtersModal = useMemo(() => {
    return (
      <FiltersModal
        opened={isFiltersModalsOpened}
        filters={filters}
        onClose={closeFiltersModal}
        onApply={handleFiltersApply}
      />
    );
  }, [isFiltersModalsOpened, closeFiltersModal, handleFiltersApply]);
  const loader = useMemo(() => <Center><Loader size="sm" color='#FF5A5F'/></Center>, []);
  const endMessage = useMemo(() => {
    if (properties.length === 0) {
      return;
    }

   return (
      <Text mt="xs" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Это все, что у нас есть
      </Text>
   );
  }, [properties.length]);

  return (
    <Container
      ref={containerRef}
      style={{ padding: '20px' }}
    >
      <FiltersButton onClick={openFiltersModal}/>
      {
        isLoading && activePage === 1 && (
          <LoadingOverlay
            visible
            loaderProps={{ color: '#FF5A5F' }}
            style={{ zIndex: 100, position: 'fixed', top: 0, bottom: 0 }}
          />
        )
      }
      {
        !isLoading && properties.length === 0 && (
          <Center h="100vh"><Text>Объявлений не найдено</Text></Center>
        )
      }
      {
        properties.length > 0 && (
          <InfiniteScroll
            dataLength={properties.length}
            next={fetchData}
            hasMore={properties.length < totalItems}
            loader={loader}
            endMessage={endMessage}
            style={{ overflow: 'hidden' }}
            scrollableTarget="search-root-component"
          >
            <PropertyList
              properties={properties}
              columns={1}
              onSelect={p => navigate('/property', { propertyId: p.id, property: p })}
              source="search"
            />
          </InfiniteScroll>
        )
      }

      {
        createPortal(filtersModal, document.body)
      }
    </Container>
  )
}

export default memo(SearchPage);
