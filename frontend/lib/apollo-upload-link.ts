import { createUploadLink } from "apollo-upload-client";

// This creates a special Apollo Link that supports file uploads
export const uploadLink = createUploadLink({
  // The URL of your GraphQL server
  uri: "http://localhost:3000/graphql",
  // Include credentials (cookies, HTTP authentication) with every request
  credentials: "include",
  // This header is required for some servers to properly handle file uploads
  headers: {
    "apollo-require-preflight": "true",
  },
});