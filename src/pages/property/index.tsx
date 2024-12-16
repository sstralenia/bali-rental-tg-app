import { memo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Property from '../../components/property';
import useProperty from '../../hooks/property';
import useShortlistedProperties from '../../hooks/shortlistedProperties';
import Layout from '../../layouts/main';

function PropertyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { isLoading, property, query } = useProperty();
  const { propertyId } = params as { propertyId: string };
  const { properties: shortlistedProperties, toggle: toggleShortlist } = useShortlistedProperties();
  const isShortlisted = shortlistedProperties.some(p => p.id === propertyId);

  const handleBack = useCallback(() => {
    if (location.state?.idx > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }, [navigate, location.state?.idx]);

  useEffect(() => {
    query(propertyId ?? '');
  }, [propertyId, query]);

  return (
    <Layout>
      <Property
        onBack={handleBack}
        property={property}
        isLoading={isLoading}
        shortlisted={isShortlisted}
        onShortlist={toggleShortlist}
      />
    </Layout>
  );
}

export default memo(PropertyPage);
