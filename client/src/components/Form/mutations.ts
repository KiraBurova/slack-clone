import gql from 'graphql-tag';

const REGISTER_USER = gql`
mutation RegisterUser($username: String!, $password: String!) {
  registerUser(username: $username, password: $password) {
    username,
    password
  }
}
`;

export {
    REGISTER_USER
}