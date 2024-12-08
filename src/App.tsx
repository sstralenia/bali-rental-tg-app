import { useEffect } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import SearchPage from './pages/search';
import ShortlistPage from './pages/shortlist';
import PropertyPage from './pages/property';
import './App.css';
import useAnalytics from './hooks/analytics';
import { StoreProvider } from './store';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
});

function App() {
  const { identify, track, setProfileInfo } = useAnalytics();

  useEffect(() => {
    Telegram.WebApp.disableVerticalSwipes();
    Telegram.WebApp.expand();

    if (Telegram.WebApp.initDataUnsafe.user) {
      identify(String(Telegram.WebApp.initDataUnsafe.user.id));
      setProfileInfo({ ...Telegram.WebApp.initDataUnsafe.user });
    }

    track('app_opened');
  }, [identify, track, setProfileInfo]);

  return (
    <MantineProvider theme={theme}>
      <StoreProvider>
        <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
          <Routes>
            <Route path='/' element={<SearchPage/>} index/>
            <Route path='/shortlisted' element={<ShortlistPage/>} />
            <Route path='/property/:propertyId' element={<PropertyPage/>} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </MantineProvider>
  )
}

export default App
