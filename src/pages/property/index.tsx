import { useCallback, useEffect } from 'react';
import Property from '../../components/property';
import useProperty from '../../hooks/property';
import { useRouter } from '../../hooks/router';
import useShortlistedProperties from '../../hooks/shortlistedProperties';

function PropertyPage() {
  const { goBack, location } = useRouter();
  const { isLoading, property, query } = useProperty();
  const { propertyId } = location.params as { propertyId: string };
  const { properties: shortlistedProperties, toggle: toggleShortlist } = useShortlistedProperties();
  const isShortlisted = shortlistedProperties.some(p => p.id === propertyId);

  console.log('isShortlisted', isShortlisted)
  
  const handleBack = useCallback(() => {
    goBack()
  }, [goBack]);

  useEffect(() => {
    query(propertyId ?? '');
  }, [propertyId, query]);

  return (
    <Property
      onBack={handleBack}
      property={property}
      isLoading={isLoading}
      shortlisted={isShortlisted}
      onShortlist={toggleShortlist}
    />
  );
}

export default PropertyPage;
