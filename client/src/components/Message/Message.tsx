import React from 'react';

import { Comment } from 'antd';

interface Message {
  author: string;
  content: string;
  time: string;
}

const Message = ({ author, content, time }: Message): React.ReactElement => {
  return (
    <Comment
      author={<a>{author}</a>}
      content={<p>{content}</p>}
      datetime={time}
    />
  );
};

export default Message;
