import { useEffect, useState, memo, useMemo, useCallback } from 'react';
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
import usePropertiesSearch from '../../hooks/properties';
import PropertyList from '../../components/property-list';
import PropertyModal from '../../components/property-modal';
import { FilterValues } from './types';
import FiltersButton from './filters-button';
import FiltersModal from './filters-modal';
import { useNavigate } from 'react-router-dom';
import { Query } from '../../api';
import { Property } from '../../types';
import usePageState from '../../hooks/pageState';

type PageState = {
  filters: FilterValues;
  properties: Property[];
  totalItems: number;
}

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
  const navigate = useNavigate();
  const { state, setPageState } = usePageState<PageState>('search');
  const [activePage, setPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { query: queryProperties, totalItems, properties, isLoading } = usePropertiesSearch();
  const [filters, setFilters] = useState<FilterValues>(state.filters || {
    location: null,
    priceFrom: null,
    priceTo: null,
    isLookForNeighboor: false,
    room: null,
  });
  const [isFiltersModalsOpened, { open: openFiltersModal, close: closeFiltersModal }] = useDisclosure(false);

  const handleFiltersApply = useCallback((filters: FilterValues) => {
    setFilters(filters);
    setPageState({
      filters,
    });
    setPage(1);
    closeFiltersModal();
  }, [setFilters, setPage, closeFiltersModal, setPageState]);

  const fetchData = useCallback(() => setPage((page) => page + 1), [setPage]);

  console.log('Render seach page', properties.length, state);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    /**
     * tgWebAppStartParam is passed in query if bot is run
     * as https://t.me/carpe_on_diet_bot/carpe_on_diet?startapp=propertyId_664
     */
    const tgWebAppStartParam = urlParams.get('tgWebAppStartParam');

    if (!tgWebAppStartParam) {
      return;
    }

    /**
     * Values are passed as key_value.
     * E.g. propertyId_664
     */
    const [key, value] = tgWebAppStartParam.split('_');

    if (key === 'propertyId') {
      navigate(`/property/${value}`);
    }
  }, [navigate]);

  useEffect(() => {
    const query = buildQueryFromFilters(filters);
    queryProperties({
      query,
      pagination: { page: activePage, perPage: ITEMS_PER_PAGE }
    });
  }, [queryProperties, activePage, filters]);

  useEffect(() => {
    if (!isLoading && activePage === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isLoading, activePage]);

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
  const propertyModal = useMemo(() => {
    if (!selectedProperty) {
      return null;
    }

    return (
      <PropertyModal property={selectedProperty} onBack={() => setSelectedProperty(null)} />
    );
  }, [selectedProperty]);

  console.log('isLoading && activePage === 1', isLoading && activePage === 1)

  return (
    <Container>
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
          >
            <PropertyList
              properties={properties}
              columns={1}
              onSelect={setSelectedProperty}
            />
          </InfiniteScroll>
        )
      }

      {
        createPortal(filtersModal, document.body)
      }

      {
        propertyModal && createPortal(propertyModal, document.body)
      }
    </Container>
  )
}

export default memo(SearchPage);
