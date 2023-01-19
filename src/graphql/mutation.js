import { gql } from "@apollo/client";
export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      message
      status
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
      message
      status
    }
  }
`;
export const CREATE_JOB_MUTATION = gql`
  mutation CreateJobMutation(
    $title: String!
    $description: String!
    $city: String!
  ) {
    createJob(title: $title, description: $description, city: $city) {
      job {
        id
        title
        description
        city
      }
      message
      status
    }
  }
`;
