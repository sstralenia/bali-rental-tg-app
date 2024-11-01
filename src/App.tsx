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
  useEffect(() => {
    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.disableVerticalSwipes();
    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.expand();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
