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

export const CREATE_JOB = gql`
  mutation CreateJob(
    $title: String!
    $description: String!
    $city: String!
    $skills: [String]!
  ) {
    createJob(
      title: $title
      description: $description
      city: $city
      skills: $skills
    ) {
      job {
        title
        description
        city
        skills {
          title
          id
        }
      }
      status
      message
    }
  }
`;

export const DeleteJob = gql`
  mutation DeleteJob($id: Int!) {
    deleteJob(id: $id) {
      message
      status
    }
  }
`;

export const UpdateJob = gql`
  mutation UpdateJob(
    $id: Int!
    $title: String!
    $description: String!
    $city: String!
    $skills: [String]!
  ) {
    updateJob(
      id: $id
      title: $title
      description: $description
      city: $city
      skills: $skills
    ) {
      status
    }
  }
`;
//   mutation CreateJobMutation(
//     $title: String!
//     $description: String!
//     $city: String!
//   ) {
//     createJob(title: $title, description: $description, city: $city) {
//       job {
//         id
//         title
//         description
//         city
//       }
//       message
//       status
//     }
//   }
// `;
