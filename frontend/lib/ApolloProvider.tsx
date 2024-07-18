
'use client';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from './apollo-client';

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  // useApollo is called with initialApolloState to get the memoized Apollo Client instance, with null it'll create one
  const apolloClient = useApollo(null);
  //return apolllo provider with apollo client config const as property and wrap up the children
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;