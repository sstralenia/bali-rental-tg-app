import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://bali-rental-bot-eu.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'GkyQ61HWG27d4XWmM4SvMLQfbJdGZv7ZqqRi8y58oJMfff26YiRLsWrG0jiN1dZ1',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;