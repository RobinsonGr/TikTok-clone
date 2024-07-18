
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';

// Variable to hold the Apollo Client instance, initially undefined
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

 //sets up a client that knows where to find the GraphQL server and how to store the data using InMemoryCache()

function createApolloClient() {
  return new ApolloClient({
     //window is just an object, and it's undefidend in ssr cos it doesn't exist in node (Server)
    ssrMode: typeof window === 'undefined', 
    // Set up the HttpLink with the graphql endpoint and include credentials for authentication
    link: new HttpLink({
      uri: 'http://localhost:3001/graphql',
      //include credentials cookies
      credentials: 'include',
    }),
    // Using InMemoryCache for caching GraphQL query results (it's the default option to store the data)
    cache: new InMemoryCache(),
  });
};

// this is in charge of hydrate if it's in ssr. The apolloClient let is empty, so here it will set the apolloClient instance
export function initializeApollo(initialState = null) {
  // If apolloClient is undefined, create a new one
  const _apolloClient = apolloClient ?? createApolloClient();

  // If there's an initial state (from SSR), restore it into the Apollo Client cache, so the initial state gets hydrated here

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

   // If window is undefined, we're on the server, so enable SSR mode, so for ssr, always create a new Apollo Client instance, 
  if (typeof window === 'undefined') return _apolloClient;

  // For csr, reuse the existing ApolloClient instance if it exists
  if (!apolloClient) apolloClient = _apolloClient;

  // Finally return the Apollo Client instance
  return _apolloClient;
};

// Using useMemo for performance improving, here we use initializeApollo
export function useApollo(initialState: any) {
  // Memoize the Apollo Client instance, re-initializing only if initialState changes
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

//to kick 
export function getClient() {
  //and apollo client isntance have the methodds to execute queryes or mutate query() mutate()
  return initializeApollo();
};