import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import MessageList from '../Chat/Messages/MessagesList';
import ChatHeader from './ChatHeader';

import { MessageType } from '@globalTypes/types';

interface ChatComponentProps {
  messages: MessageType[];
}

export interface MatchParams {
  id: string;
}

const ChatComponent = ({ messages }: ChatComponentProps): React.ReactElement => {
  const match = useRouteMatch<MatchParams>('/chat/:id');

  return (
    <>
      <ChatHeader match={match} />
      <MessageList messages={messages} />
    </>
  );
};

export default ChatComponent;
