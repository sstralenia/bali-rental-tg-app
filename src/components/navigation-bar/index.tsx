import { AppShell, Container, Text } from '@mantine/core';
import { IconHeart, IconSearch } from '@tabler/icons-react';
import { useRouter } from '../../hooks/router';

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
  const { location, navigate } = useRouter();

  return (
    <AppShell.Footer>
      <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {
          tabs.map(tab => (
            <a
              key={tab.path}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3, padding: 8 }}
              onClick={() => navigate(tab.path)}
            >
              <tab.icon size={25} color={location.path === tab.path ? '#FF5A5F' : '#6A6A6A' }/>
              <Text style={{ fontSize: 10, color:  location.path === tab.path ? '#FF5A5F' : '#6A6A6A' }}>
                {tab.name}
              </Text>
            </a>
          ))
        }
      </Container>
    </AppShell.Footer>
  )
};

export default NavigationBar;
