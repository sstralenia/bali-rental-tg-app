import { useCallback, useEffect } from 'react';
import Property from '../../components/property';
import useProperty from '../../hooks/property';
import { useRouter } from '../../hooks/router';
import useShortlistedProperties from '../../hooks/shortlistedProperties';
import { Property as TProperty } from '../../types';

function PropertyPage() {
  const { goBack, location } = useRouter();
  const { isLoading, property, query } = useProperty();
  const { propertyId, property: predefinedProperty } = location.params as { propertyId: string, property?: TProperty };
  const { properties: shortlistedProperties, toggle: toggleShortlist } = useShortlistedProperties();
  const isShortlisted = shortlistedProperties.some(p => p.id === propertyId);

  const handleBack = useCallback(() => {
    goBack()
  }, [goBack]);

  useEffect(() => {
    if (!predefinedProperty) {
      query(propertyId ?? '');
    }
  }, [propertyId, predefinedProperty, query]);

  useEffect(() => {
    document.getElementById('property-root-component')?.scrollTo(0, 0);
  }, [propertyId])

  return (
    <Property
      onBack={handleBack}
      property={predefinedProperty || property}
      isLoading={isLoading}
      shortlisted={isShortlisted}
      onShortlist={toggleShortlist}
    />
  );
}

export default PropertyPage;
