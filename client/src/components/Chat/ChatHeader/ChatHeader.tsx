import React from 'react';
import { match } from 'react-router';

import { MatchParams } from '../Chat';

import { PageHeader } from 'antd';

interface ChatHeaderProps {
  match: match<MatchParams> | null;
}

const ChatHeader = ({ match }: ChatHeaderProps): React.ReactElement => {
  const privateChat = `Chatting with ${match?.params.id}`;

  return (
    <>
      <PageHeader title={privateChat} />,
    </>
  );
};

export default ChatHeader;
