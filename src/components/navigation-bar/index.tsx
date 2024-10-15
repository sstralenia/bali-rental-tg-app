import { AppShell, Container, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconHeart, IconSearch } from '@tabler/icons-react';

const tabs = [
  {
    name: 'Поиск',
    path: '/',
    icon: IconSearch,
  },
  {
    name: 'Избранное',
    path: '/shortlisted',
    icon: IconHeart,
  },
]

const NavigationBar = () => {
  const location = useLocation();

  return (
    <AppShell.Footer>
      <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {
          tabs.map(tab => (
            <Link
              key={tab.path}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3, padding: 8 }}
              to={tab.path}
            >
              <tab.icon size={25} color={location.pathname === tab.path ? '#FF5A5F' : '#6A6A6A' }/>
              <Text style={{ fontSize: 10, color:  location.pathname === tab.path ? '#FF5A5F' : '#6A6A6A' }}>
                {tab.name}
              </Text>
            </Link>
          ))
        }
      </Container>
    </AppShell.Footer>
  )
};

export default NavigationBar;
