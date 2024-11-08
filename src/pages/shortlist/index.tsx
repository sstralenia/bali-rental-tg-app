import { memo } from 'react';
import { Container, Center, Text } from '@mantine/core';

import useShortlistedProperties from '../../hooks/shortlistedProperties';
import PropertyList from '../../components/property-list';
import { useRouter } from '../../hooks/router';

function ShortlistPage() {
  const { navigate } = useRouter();
  const { properties: shortlistedProperties } = useShortlistedProperties();

  return (
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
            onSelect={p => navigate('/property', { propertyId: p.id, property: p })}
            source="shortlist"
          />
        )
      }
    </Container>
  );
}

export default memo(ShortlistPage);