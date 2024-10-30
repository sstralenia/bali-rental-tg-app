import { useCallback, useEffect } from 'react';
import { useNavigate, useParams,  } from 'react-router-dom';
import useProperty from '../../hooks/property';
import Property from '../../components/property';

function PropertyPage() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const { isLoading, property, query } = useProperty();
  
  const handleBack = useCallback(() => {
    const canGoBack = window.history.length > 2;

    if (canGoBack) {
      navigate(-1);
      return;
    }

    navigate('/');
  }, [navigate]);

  useEffect(() => {
    query(propertyId ?? '');

    /**
     * Scroll to top cause sometime
     * when page is open it's not on top
     * 
     */
    document.body.scrollBy(0, 0);
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
