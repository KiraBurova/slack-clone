import gql from 'graphql-tag';

const MESSAGE_SUBSCRIPTION = gql`
  subscription onMessageSend {
    message {
      content
      author
      time
      id
    }
  }
`;

const START_CHAT_MUTATION = gql`
  mutation startChat($userIds: [ID!]!) {
    startChat(userIds: $userIds) {
      title
    }
  }
`;

export { MESSAGE_SUBSCRIPTION, START_CHAT_MUTATION };
