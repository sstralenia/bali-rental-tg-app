import { memo, useEffect } from 'react';
import { Container, Center, Text } from '@mantine/core';

import useShortlistedProperties from '../../hooks/shortlistedProperties';
import PropertyList from '../../components/property-list';
import Layout from '../../layouts/main';
import { useNavigate } from 'react-router-dom';
import { useScroll } from '../../hooks/scroll';
import useRates from '../../hooks/rates';

function ShortlistPage() {
  const navigate = useNavigate();
  const { properties: shortlistedProperties } = useShortlistedProperties();
  const { scrollPosition, handleScroll } = useScroll('shortlist');
  const { rates } = useRates();

  useEffect(() => {
    window.onscroll = handleScroll;
    window.scrollTo(0, scrollPosition);

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <Layout>
      <Container style={{ padding: '20px', paddingBottom: 'calc(20px + var(--tg-safe-area-inset-bottom, 0px))' }}>
        {
          shortlistedProperties.length === 0 && (
            <Center h="calc(100vh - 80px)"><Text>Нет избранных объявлений</Text></Center>
          )
        }
        {
          shortlistedProperties.length > 0 && (
            <PropertyList
              properties={shortlistedProperties}
              columns={1}
              onSelect={p => navigate(`/property/${p.id}`)}
              source="shortlist"
              rates={rates}
            />
          )
        }
      </Container>
    </Layout>
  );
}

export default memo(ShortlistPage);