import { createContext, FC, useState } from 'react';
import { Box } from '@mantine/core';
import Layout from '../layouts/main';

type LocationType = {
  path: string;
  params: Record<string, unknown>;
}

export const RouterContext = createContext<{
  location: LocationType;
  setLocation: (location: LocationType) => void;
}>({ location: { path: '', params: {} }, setLocation: () => {} });

type ProviderProps = {
  routes: { path: string; element: React.ReactNode, name: string }[];
  defaultLocation?: LocationType;
}

const DEFAULT_LOCATION: LocationType = { path: '/', params: {} };

export const RouterProvider: FC<ProviderProps> = ({ routes, defaultLocation = DEFAULT_LOCATION}) => {
  const [location, setLocation] = useState<LocationType>(defaultLocation);

  return (
    <RouterContext.Provider value={{ location, setLocation }}>
      <Layout>
        {
          routes.map((route) => (
            <Box
              key={route.path}
              id={`${route.name}-root-component`}
              style={{
                position: 'relative',
                height: 'calc(100vh - 60px)',
                display: location.path === route.path ? 'block' : 'none',
                overflowY: location.path === route.path ? 'scroll' : 'hidden'
              }}>
              {route.element}
            </Box>
          ))
        }
      </Layout>
    </RouterContext.Provider>
  );
};