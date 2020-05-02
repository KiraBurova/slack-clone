import gql from 'graphql-tag';

const START_CHAT_MUTATION = gql`
  mutation startChat($userIds: [ID!]!) {
    startChat(userIds: $userIds) {
      title
    }
  }
`;

export { START_CHAT_MUTATION };
