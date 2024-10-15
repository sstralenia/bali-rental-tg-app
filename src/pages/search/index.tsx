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

const ITEMS_PER_PAGE = 6;

function SearchPage() {
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
    const query = {
      location: filters.location ?? undefined,
      priceFrom: filters.priceFrom ? parseInt(filters.priceFrom) : undefined,
      priceTo: filters.priceTo ? parseInt(filters.priceTo) : undefined,
      roomsFrom: filters.roomsFrom ? parseInt(filters.roomsFrom) : undefined,
      roomsTo: filters.roomsTo ? parseInt(filters.roomsTo) : undefined,
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
