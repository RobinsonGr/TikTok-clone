// lib/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Create an error link to handle GraphQL and network errors
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, locations, path }) => {
      console.log(`GraphQL Error: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.log(`Network Error: ${networkError}`);
  }
});

// Create an HTTP link to connect to the GraphQL API
const httpLink = new HttpLink({
  uri: '/api/graphql', // Adjust the URI to your GraphQL endpoint
});

// Combine the error link and HTTP link into a single Apollo Link
const link = ApolloLink.from([errorLink, httpLink]);

// Create the Apollo Client instance
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
