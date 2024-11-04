import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import NavigationBar from '../components/navigation-bar';
import { FC, ReactNode } from 'react';

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
          width: '100vw',
          backgroundColor: '#F2F3F5',
          paddingBottom: 80,
        },
      }}
    > 
      <AppShell.Main>
        {children}
      </AppShell.Main>
      <NavigationBar />
    </AppShell>
  )
}

export default Main
