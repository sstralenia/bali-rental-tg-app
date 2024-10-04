import { NavLink } from "react-router-dom";
import {
  AppShell,
  List,
  Text,
  Container,
} from '@mantine/core';
import './styles.css'

export default function Header() {
  return (
    <AppShell.Header height={{ base: 50, md: 70 }} p="md">
      <Container style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <List className='navigation-list'>
          <List.Item>
            <NavLink to="/" >
              <Text>Поиск вакансий</Text>
            </NavLink>
          </List.Item>
          <List.Item>
            <NavLink to="/shortlisted">
              <Text>Избранное</Text>
            </NavLink>
          </List.Item>
        </List>
      </Container>
    </AppShell.Header>
  );
}