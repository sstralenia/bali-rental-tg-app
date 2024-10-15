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

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><SearchPage/></Layout>
  },
  {
    path: '/shortlisted',
    element: <Layout><ShortlistPage/></Layout>
  },
  {
    path: '/property-detail',
    element: <Layout><PropertyPage/></Layout>
  },

]);


function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
