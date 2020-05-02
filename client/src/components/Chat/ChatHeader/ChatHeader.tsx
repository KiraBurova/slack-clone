import React from 'react';
import { match } from 'react-router';

import { PageHeader } from 'antd';

import { MatchParams } from '../types';

interface ChatHeaderProps {
  match: match<MatchParams> | null;
}

const ChatHeader = ({ match }: ChatHeaderProps): React.ReactElement => {
  const privateChat = `Chatting with ${match?.params.name}`;

  return (
    <>
      <PageHeader title={privateChat} />,
    </>
  );
};

export default ChatHeader;
