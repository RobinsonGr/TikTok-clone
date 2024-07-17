import {ApolloProvider} from '@apollo/client';
import client from './apollo-client';



const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    //return apolllo provider with apollo client config const as property and wrap up the children
    return (
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    );
  };
  
  export default ApolloProviderWrapper;