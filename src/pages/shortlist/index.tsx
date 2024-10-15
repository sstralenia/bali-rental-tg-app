import { memo } from 'react';

import useShortlistedProperties from '../../hooks/shortlistedProperties';
import PropertyList from '../../components/property-list';
import { Container } from '@mantine/core';

function ShortlistPage() {
  const { properties: shortlistedProperties } = useShortlistedProperties();

  return (
    <Container>
      <PropertyList properties={shortlistedProperties} columns={1}/>
    </Container>
  );
}

export default memo(ShortlistPage);