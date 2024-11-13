import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_API_URL,
    headers: {
      'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;