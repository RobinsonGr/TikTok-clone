import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { errorLink } from './errorLink';

export function createApolloClient() {
  const uploadLink = createUploadLink({
    uri: "http://localhost:3000/graphql",
    credentials: "include",
    headers: {
      "apollo-require-preflight": "true",
    },
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getCommentsByPostId: {
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    link: ApolloLink.from([errorLink, uploadLink]),
  });
}