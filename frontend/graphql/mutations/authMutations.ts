import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(signInInput: { email: $email, password: $password }) {
      person {
        id
        name
        email
      }
      error {
        message
      }
    }
  }
`;