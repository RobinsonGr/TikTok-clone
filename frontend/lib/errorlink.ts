import { onError } from "@apollo/client/link/error";
import { Observable } from "@apollo/client";
import { refreshToken } from './refreshToken';
import { getClient } from './apollo-client';

let retryCount = 0;
const maxRetry = 3;

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const operationName = operation.operationName;
  console.log(operationName, "operationName");

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;

        return new Observable((observer) => {
          refreshToken(getClient())
            .then((token) => {
              console.log("token", token);
              operation.setContext((previousContext: any) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: token,
                },
              }));
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }
    }
  }
});

})
.catch((error) => observer.error(error));
});


