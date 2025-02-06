import { useEffect, memo, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Container,
  Loader,
  Center,
  Text,
  LoadingOverlay
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropertyList from '../../components/property-list';
import usePropertiesSearch from '../../hooks/properties';
import useAnalytics from '../../hooks/analytics';
import { FilterValues } from './types';
import FiltersButton from './filters-button';
import FiltersModal from './filters-modal';
import Layout from '../../layouts/main';
import { useScroll } from '../../hooks/scroll';
import useRates from '../../hooks/rates';

function SearchPage() {
  const navigate = useNavigate();
  const {
    activePage,
    nextPage,
    totalItems,
    properties,
    isLoading,
    filters,
    applyFilters,
  } = usePropertiesSearch();
  const { scrollPosition, handleScroll } = useScroll('search');
  const { rates } = useRates();
  const [isFiltersModalsOpened, { open: openFiltersModal, close: closeFiltersModal }] = useDisclosure(false);
  const { track } = useAnalytics();

  const handleFiltersApply = useCallback((filters: FilterValues) => {
    applyFilters(filters);
    track('filters_applied', { ...filters });
    closeFiltersModal();
    document.body.scrollIntoView({ behavior: 'smooth' });
  }, [applyFilters, closeFiltersModal, track]);

  const fetchData = useCallback(() => {
    nextPage();
  }, [nextPage]);

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
      return navigate(`/property/${value}`);
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, []);

  const filtersModal = useMemo(() => {
    return (
      <FiltersModal
        opened={isFiltersModalsOpened}
        filters={filters}
        onClose={closeFiltersModal}
        onApply={handleFiltersApply}
      />
    );
  }, [isFiltersModalsOpened, filters, closeFiltersModal, handleFiltersApply]);
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
    <Layout>
      <Container
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
              onScroll={handleScroll}
            >
              <PropertyList
                properties={properties}
                columns={1}
                onSelect={p => navigate(`/property/${p.id}`)}
                source="search"
                rates={rates}
              />
            </InfiniteScroll>
          )
        }

        {
          createPortal(filtersModal, document.body)
        }
      </Container>
    </Layout>
  )
}

export default memo(SearchPage);
