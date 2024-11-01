import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Layout from './layouts/main';
import SearchPage from './pages/search';
import ShortlistPage from './pages/shortlist';
import PropertyPage from './pages/property';
import './App.css';
import { useEffect } from 'react';
import useAnalytics from './hooks/analytics';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <SearchPage/>
      </Layout>
    )
  },
  {
    path: '/shortlisted',
    element: (
      <Layout>
        <ShortlistPage/>
      </Layout>
    )
  },
  {
    path: '/property/:propertyId',
    element: <Layout><PropertyPage/></Layout>
  },

]);


function App() {
  const { identify, track } = useAnalytics();
  useEffect(() => {
    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.disableVerticalSwipes();
    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.expand();

    // @ts-expect-error Telegram is not a key of window
    if (window.Telegram.WebApp.initDataUnsafe.user?.id) {
      // @ts-expect-error Telegram is not a key of window
      identify(window.Telegram.WebApp.initDataUnsafe.user?.id);
    }

    track('app_opened');
  }, [identify, track]);

  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
