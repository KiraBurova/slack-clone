import gql from 'graphql-tag';

const GET_USERS_QUERY = gql`
  query getUsers {
    users {
      username
      _id
    }
  }
`;

export { GET_USERS_QUERY };
