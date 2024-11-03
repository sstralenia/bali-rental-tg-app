import {
  AppShell,
  List,
  Text,
  Container,
} from '@mantine/core';
import './styles.css'

export default function Header() {
  return (
    <AppShell.Header p="md">
      <Container style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
        <List className='navigation-list'>
          <List.Item>
            <a href="/" >
              <Text>Поиск вакансий</Text>
            </a>
          </List.Item>
          <List.Item>
            <a href="/shortlisted">
              <Text>Избранное</Text>
            </a>
          </List.Item>
        </List>
      </Container>
    </AppShell.Header>
  );
}