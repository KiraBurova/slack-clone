import React from 'react';
import { Layout } from 'antd';

import Sidebar from '../../components/Sidebar';
import MessageInput from '../../components/MessageInput';
import MessageList from '../../components/MessagesList';

const { Header, Footer, Sider, Content } = Layout;

const message = [
  {
    author: 'Han Solo',
    content: 'Content of message',
    time: new Date().toLocaleString(),
  },
  {
    author: 'Han Solo',
    content: 'Content of message',
    time: new Date().toLocaleString(),
  },
  {
    author: 'Han Solo',
    content: 'Content of message',
    time: new Date().toLocaleString(),
  },
];
const Chat = (): React.ReactElement => {
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <MessageList messages={message} />
          </Content>
          <Footer>
            <MessageInput />
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Chat;
