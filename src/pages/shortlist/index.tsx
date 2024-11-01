import { memo, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Container, Center, Text } from '@mantine/core';

import useShortlistedProperties from '../../hooks/shortlistedProperties';
import PropertyModal from '../../components/property-modal';
import PropertyList from '../../components/property-list';
import { Property } from '../../types';

function ShortlistPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { properties: shortlistedProperties } = useShortlistedProperties();

  const propertyModal = useMemo(() => {
    if (!selectedProperty) {
      return null;
    }

    return (
      <PropertyModal property={selectedProperty} onBack={() => setSelectedProperty(null)} />
    );
  }, [selectedProperty]);

  return (
    <Container>
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
            onSelect={setSelectedProperty}
            source="shortlist"
          />
        )
      }

      {
        propertyModal && createPortal(propertyModal, document.body)
      }
    </Container>
  );
}

export default memo(ShortlistPage);