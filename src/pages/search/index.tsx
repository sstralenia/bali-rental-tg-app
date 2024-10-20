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
import { FilterValues } from './types';
import FiltersButton from './filters-button';
import FiltersModal from './filters-modal';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;
const LOOK_FOR_NEIGHBOR_ROOMS_NUMBER = 69;

function SearchPage() {
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const { query: queryProperties, queryNext: queryNextProperties, totalItems, properties, isLoading } = usePropertiesSearch();
  const [filters, setFilters] = useState<FilterValues>({});
  const [isFiltersModalsOpened, { open: openFiltersModal, close: closeFiltersModal }] = useDisclosure(false);

  const handleFiltersApply = useCallback((filters: FilterValues) => {
    setFilters(filters);
    setPage(1);
    closeFiltersModal();
  }, [setFilters, setPage, closeFiltersModal]);

  const fetchData = useCallback(() => setPage((page) => page + 1), [setPage]);

  console.log('Render seach page', properties.length);
  
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
    const query = {
      location: filters.location ?? undefined,
      priceFrom: filters.priceFrom ? parseInt(filters.priceFrom) : undefined,
      priceTo: filters.priceTo ? parseInt(filters.priceTo) : undefined,
      roomsFrom: filters.isLookForNeighboor
        ? LOOK_FOR_NEIGHBOR_ROOMS_NUMBER
        : filters.roomsFrom
          ? parseInt(filters.roomsFrom)
          : undefined,
      roomsTo: filters.isLookForNeighboor 
        ? LOOK_FOR_NEIGHBOR_ROOMS_NUMBER 
        : filters.roomsTo
          ? parseInt(filters.roomsTo)
          : undefined,
    };

    if (activePage === 1) {
      queryProperties({ query, pagination: { page: activePage, perPage: ITEMS_PER_PAGE } });
    } else {
      queryNextProperties({ query, pagination: { page: activePage, perPage: ITEMS_PER_PAGE } });
    }
  }, [queryProperties, queryNextProperties, activePage, filters]);

  const filtersModal = useMemo(() => {
    return (
      <FiltersModal
        opened={isFiltersModalsOpened}
        onClose={closeFiltersModal}
        onApply={handleFiltersApply}
      />
    );
  }, [isFiltersModalsOpened, closeFiltersModal, handleFiltersApply]);
  const loader = useMemo(() => <Center><Loader size="sm"/></Center>, []);
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
    <Container>
      <FiltersButton onClick={openFiltersModal}/>
      {
        isLoading && properties.length === 0 && <LoadingOverlay visible />
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
