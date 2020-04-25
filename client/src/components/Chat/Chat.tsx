import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { useSubscription } from '@apollo/react-hooks';

import MessageList from '../Chat/Messages/MessagesList';
import ChatHeader from './ChatHeader';

import { MessageType } from '../../types/types';

import { MESSAGE_SUBSCRIPTION } from './mutations';

export interface MatchParams {
  id: string;
}
const messages = [
  {
    id: '1',
    author: 'Han Solo',
    content: 'Content of message',
    time: new Date().toLocaleString(),
  },
  {
    id: '2',
    author: 'Han Solo',
    content: 'Content of message',
    time: new Date().toLocaleString(),
  },
  {
    id: '3',
    author: 'Han Solo',
    content: 'Content of message',
    time: new Date().toLocaleString(),
  },
];

const ChatComponent = (): React.ReactElement => {
  const match = useRouteMatch<MatchParams>('/chat/:id');

  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION);

  console.log(data);

  return (
    <>
      <ChatHeader match={match} />
      <MessageList messages={messages} />
    </>
  );
};

export default ChatComponent;
