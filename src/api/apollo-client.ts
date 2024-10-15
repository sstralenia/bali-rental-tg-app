import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://busy-lamprey-45.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'tdxH1uy14R0AV7NdU1KxPtjJjVutU7F9q3b4OFLaT3wJYRnsMw2iVKxgup8fZTzY',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;