import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { useSubscription } from '@apollo/react-hooks';

import MessageList from '../Chat/Messages/MessagesList';
import ChatHeader from './ChatHeader';

import { MessageType } from '../../types/types';

import { MESSAGE_SUBSCRIPTION } from './mutations';

export interface MatchParams {
  id: string;
}

const ChatComponent = (): React.ReactElement => {
  const match = useRouteMatch<MatchParams>('/chat/:id');

  const [messages, setMessages] = useState<MessageType[]>([]);

  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData(data) {
      setMessages([...messages, data.subscriptionData.data.message]);
    },
  });

  console.log(error, data);

  return (
    <>
      <ChatHeader match={match} />
      <MessageList messages={messages} />
    </>
  );
};

export default ChatComponent;
