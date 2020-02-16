import gql from 'graphql-tag';

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username,
      password
    }
  }
`;

export {
  REGISTER_USER
}