import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://bali-bot-production.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'fOcUwlZIH9FwpwyBKQyKyhYL3W4cCkjoU1MJMiTqI9OCSgXZlr6Hs6zJglSy5OCb',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;