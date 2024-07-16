import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://your-graphql-endpoint.com/graphql',
  //credentials: 'same-origin',
});

 //sets up a client that knows where to find the GraphQL server and how to store the data using InMemoryCache()
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
