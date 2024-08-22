import { ApolloClient, NormalizedCacheObject, gql, Observable, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getClient } from './apollo-client';

// This function attempts to refresh the access token
async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    // Send a mutation to refresh the token
    const { data } = await client.mutate({
      mutation: gql`
        mutation RefreshToken {
          refreshToken
        }
      `,
    });

    const newAccessToken = data?.refreshToken;
    console.log("newAccessToken", newAccessToken);
    
    if (!newAccessToken) {
      throw new Error("New access token not received.");
    }
    
    // Store the new token in localStorage for future use
    localStorage.setItem("accessToken", newAccessToken);
    return `Bearer ${newAccessToken}`;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting new access token.");
  }
}

// Keep track of how many times we've tried to refresh the token
let retryCount = 0;
const maxRetry = 3;

// Handling errors, getting the refreshToken string and put it in the headers, try max 3 times
export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const operationName = operation.operationName;
  console.log(operationName, "operationName");

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // If we get an authentication error and haven't exceeded max retries
      if (err.extensions.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;

        // it retunns a new Observable that will attempt to refresh the token
        return new Observable((observer) => {
          refreshToken(getClient())
            .then((token) => {
              console.log("token", token);
              // Update the operation context with the new token
              operation.setContext((previousContext: any) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: token,
                },
              }));
              // Retry the operation with the new token
              //Forward is just like the equivalent of next in express .js instead here it moves to the next link
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }
    }
  }
});