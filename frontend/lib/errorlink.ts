// import { onError } from "@apollo/client/link/error";
// import { Observable } from "@apollo/client";
// import { refreshToken } from './refreshToken';
// import { getClient } from './apollo-client';

// let retryCount = 0;
// const maxRetry = 3;

// export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//   const operationName = operation.operationName;
//   console.log(operationName, "operationName");

//   if (graphQLErrors) {
//     for (const err of graphQLErrors) {
//       if (err.extensions.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
//         retryCount++;

//         return new Observable((observer) => {
//           refreshToken(getClient())
//             .then((token) => {
//               console.log("token", token);
//               operation.setContext((previousContext: any) => ({
//                 headers: {
//                   ...previousContext.headers,
//                   authorization: token,
//                 },
//               }));
//               const forward$ = forward(operation);
//               forward$.subscribe(observer);
//             })
//             .catch((error) => observer.error(error));
//         });
//       }
//     }
//   }
// });

// })
// .catch((error) => observer.error(error));
// });

//rewritten 

const maxRetry = 3;

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const operationName = operation.operationName;
  console.log(`Operation Name: ${operationName}`);

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED") {
        return new Observable((observer) => {
          let retryCount = 0;

          const handleRetry = async () => {
            if (retryCount >= maxRetry) {
              observer.error(new Error("Maximum retry attempts exceeded"));
              return;
            }

            retryCount++;

            try {
              const token = await refreshToken(getClient());
              console.log("New token:", token);

              // Update context with new token
              operation.setContext((prevContext) => ({
                headers: {
                  ...prevContext.headers,
                  authorization: token,
                },
              }));

              // Forward the operation
              const forward$ = forward(operation);
              forward$.subscribe({
                next: (result) => observer.next(result),
                error: (error) => observer.error(error),
                complete: () => observer.complete(),
              });

            } catch (error) {
              // Retry on error from refreshToken
              console.error("Token refresh failed:", error);
              handleRetry();
            }
          };

          handleRetry();
        });
      }
    }
  }
});