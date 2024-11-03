import { createContext, FC, useState } from 'react';
import { Box } from '@mantine/core';

type LocationType = {
  path: string;
  params: Record<string, unknown>;
}

export const RouterContext = createContext<{
  location: LocationType;
  setLocation: (location: LocationType) => void;
}>({ location: { path: '', params: {} }, setLocation: () => {} });

type ProviderProps = {
  routes: { path: string; element: React.ReactNode }[];
  defaultLocation: LocationType | null;
}

export const RouterProvider: FC<ProviderProps> = ({ routes, defaultLocation }) => {
  const [location, setLocation] = useState<LocationType>(defaultLocation || { path: '/', params: {} });

  return (
    <RouterContext.Provider value={{ location, setLocation }}>
        {
          routes.map((route) => (
            <Box
              key={route.path}
              style={{
                position: 'relative',
                height: '100vh',
                display: location.path === route.path ? 'block' : 'none',
                overflowY: location.path === route.path ? 'scroll' : 'hidden'
              }}>
              {route.element}
            </Box>
          ))
        }
    </RouterContext.Provider>
  );
};