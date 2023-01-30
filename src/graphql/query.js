import { gql } from "@apollo/client";



export const SKILLS_QUERY = gql`
  query skillsQuery($title: String!, $limit: Int) {
    skills(title: $title, limit: $limit) {
      skills {
        id
        title
      }
      message
      status
    }
  }
`;

export const SEARCHJOB_QUERY = gql`
  query searchJobQuery(
    $name: String!
    $page: Int!
    $limit: Int!
    $sort: String!
  ) {
    searchJob(name: $name, page: $page, limit: $limit, sort: $sort) {
      jobs {
        id
        title
        description
        city
        updatedAt
        skills {
          id
          title
        }
      }
      totalPage
      totalCount
      message
      status
    }
  }
`;

export const jobsQuery = gql`
  query Jobs($page: Int!, $pageSize: Int!, $sort: String!) {
    jobs(page: $page, pageSize: $pageSize, sort: $sort) {
      jobs {
        id
        title
        description
        city
        updatedAt
        skills {
          id
          title
        }
      }
      message
      totalPage
    }
  }
`;
export const SKILLS = gql`
  query Skills($title: String!, $limit: Int) {
    skills(title: $title, limit: $limit) {
      skills {
        id
        title
      }
      message
      status
    }
  }
`;

export const Job = gql`
  query job($id: Int!) {
    job(id: $id) {
      job {
        title
        description
        city
        updatedAt
        skills {
          id
          title
        }
      }
    }
  }
`;

export const SHOW_TOKENS = gql`
  query Showtokens {
    showtokens {
      message
      status
    }
  }
`;