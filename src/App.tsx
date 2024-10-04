import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Layout from './layouts/main';
import SearchPage from './pages/search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><SearchPage/></Layout>
  },
  {
    path: '/shortlisted',
    element: <div>Shortlist</div>//<Layout><SearchPage/></Layout>
  },
  {
    path: '/properties/:id',
    element: <div>Property</div>//<Layout><SearchPage/></Layout>
  },

]);


function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
