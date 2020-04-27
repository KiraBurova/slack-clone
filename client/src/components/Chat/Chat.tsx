import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { useSubscription, useMutation, useQuery } from '@apollo/react-hooks';

import MessageList from '../Chat/Messages/MessagesList';
import ChatHeader from './ChatHeader';

import { MessageType } from '../../types/types';

import { MESSAGE_SUBSCRIPTION, START_CHAT_MUTATION, ME } from './mutations';

export interface MatchParams {
  id: string;
  name: string;
}

const ChatComponent = (): React.ReactElement => {
  const match = useRouteMatch<MatchParams>('/chat/:name/:id');

  const [messages, setMessages] = useState<MessageType[]>([]);

  // const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
  //   onSubscriptionData(data) {
  //     setMessages([...messages, data.subscriptionData.data.message]);
  //   },
  // });

  const [startChatMutation, { error: loginError, loading: loginLoading }] = useMutation(
    START_CHAT_MUTATION,
    {
      onError(error) {
        console.log(error);
      },
      onCompleted(data) {
        console.log(data);
      },
    },
  );

  const { data, error } = useQuery(ME);

  // useEffect(() => {
  //   startChatMutation({
  //     variables: {
  //       userIds: [match?.params.id],
  //     },
  //   });
  // }, [match?.params.id]);

  return (
    <>
      <ChatHeader match={match} />
      <MessageList messages={messages} />
    </>
  );
};

export default ChatComponent;
