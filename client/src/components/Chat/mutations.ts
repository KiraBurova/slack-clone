import gql from 'graphql-tag';

const START_CHAT_MUTATION = gql`
  mutation startChat($secondUserId: ID!) {
    startChat(secondUserId: $secondUserId) {
      title
    }
  }
`;

export { START_CHAT_MUTATION };
