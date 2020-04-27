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

const ME = gql`
  query Me {
    me {
      username
      _id
    }
  }
`;

export { MESSAGE_SUBSCRIPTION, START_CHAT_MUTATION, ME };
