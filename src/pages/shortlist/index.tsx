import { memo } from 'react';
import { Container, Center, Text } from '@mantine/core';

import useShortlistedProperties from '../../hooks/shortlistedProperties';
import PropertyList from '../../components/property-list';
import Layout from '../../layouts/main';
import { useNavigate } from 'react-router-dom';

function ShortlistPage() {
  const navigate = useNavigate();
  const { properties: shortlistedProperties } = useShortlistedProperties();

  return (
    <Layout>
      <Container style={{ padding: '20px' }}>
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
            />
          )
        }
      </Container>
    </Layout>
  );
}

export default memo(ShortlistPage);