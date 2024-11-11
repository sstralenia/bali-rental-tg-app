import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { RouterProvider } from './router';

import SearchPage from './pages/search';
import ShortlistPage from './pages/shortlist';
import PropertyPage from './pages/property';
import './App.css';
import { useEffect } from 'react';
import useAnalytics from './hooks/analytics';
import { StoreProvider } from './store';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
});

const routes = [
  {
    name: 'search',
    path: '/',
    element: (
      <SearchPage/>
    )
  },
  {
    name: 'shortlisted',
    path: '/shortlisted',
    element: (
      <ShortlistPage/>
    )
  },
  {
    name: 'property',
    path: '/property',
    element: (
      <PropertyPage/>
    )
  },
];

function App() {
  const { identify, track } = useAnalytics();
  useEffect(() => {
    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.disableVerticalSwipes();
    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.expand();

    // @ts-expect-error Telegram is not a key of window
    if (window.Telegram.WebApp.initDataUnsafe.user) {
      // @ts-expect-error Telegram is not a key of window
      identify(window.Telegram.WebApp.initDataUnsafe.user.id);
      // @ts-expect-error Telegram is not a key of window
      setProfileInfo({ ...window.Telegram.WebApp.initDataUnsafe.user });
    }

    track('app_opened');
  }, [identify, track]);

  const location = (() => {
    const urlParams = new URLSearchParams(window.location.search);
    /**
     * tgWebAppStartParam is passed in query if bot is run
      * as https://t.me/carpe_on_diet_bot/carpe_on_diet?startapp=propertyId_664
      */
    const tgWebAppStartParam = urlParams.get('tgWebAppStartParam');

    if (!tgWebAppStartParam) {
      return;
    }

    /**
     * Values are passed as key_value.
     * E.g. propertyId_664
     */
    const [key, value] = tgWebAppStartParam.split('_');

    if (key === 'propertyId') {
      return {
        path: '/property',
        params: {
          propertyId: value,
        }
      }
    }
  })();

  return (
    <MantineProvider theme={theme}>
      <StoreProvider>
        <RouterProvider
          routes={routes}
          defaultLocation={location}
        />
      </StoreProvider>
    </MantineProvider>
  )
}

export default App
