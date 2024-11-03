import { useCallback, useEffect } from 'react';
import Property from '../../components/property';
import useProperty from '../../hooks/property';
import { useRouter } from '../../hooks/router';

function PropertyPage() {
  const { goBack, location } = useRouter();
  const { isLoading, property, query } = useProperty();
  const { propertyId } = location.params as { propertyId: string };
  
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
    />
  );
}

export default PropertyPage;
