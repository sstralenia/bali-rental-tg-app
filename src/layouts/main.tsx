import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import Header from './header';

function Main({ children }) {
  const theme = useMantineTheme();

  return (
    <AppShell
      header={{ height: 60 }}
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          width: '100%',
        },
      }}
    > 
      <Header />
      <AppShell.Main style={{ width: '100vw', paddingTop: '140px'}}>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default Main
