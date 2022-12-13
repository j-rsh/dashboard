import { gql } from "@apollo/client";
export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      message
      status
    }
  }
`;
