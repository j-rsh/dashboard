import {gql} from '@apollo/client';

export const GET_EMAIL = gql`
    query{
        user {
            email
        }
}
`
export const SHOWTOKENS_QUERY = gql`
  query showTokensQuery {
    showtokens {
      tokens {
        id
        createdAt
      }
      message
      status
    }
  }
`;