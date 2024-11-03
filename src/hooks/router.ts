import { useContext, useCallback } from 'react';
import { RouterContext } from '../router';

export const useRouter = () => {
  const { location, setLocation } = useContext(RouterContext);
  const navigate = useCallback((path: string, params: Record<string, unknown> = {}) => {
    setLocation({
      path,
      params: {
        ...params,
        prevPath: location.path,
        prevParams: location.params,
      }
    });
  }, [setLocation, location]);

  const goBack = useCallback(() => {
    const { prevPath, prevParams } = location.params;

    if (!prevPath) {
      navigate('/');
      return;
    }

    navigate(prevPath as string, prevParams as Record<string, unknown>);
  }, [navigate, location.params]);

  return { location, navigate, goBack };
};