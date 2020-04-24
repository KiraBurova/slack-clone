import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import Sidebar from '../../components/Sidebar';
import MessageInput from '../../components/Chat/Messages/MessageInput';
import ChatComponent from '../../components/Chat';

const { Footer, Sider, Content } = Layout;

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
      <Layout style={{ height: '100%' }}>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content>
            <Switch>
              <Route path='/chat/:id' exact>
                <ChatComponent messages={message} />
              </Route>
            </Switch>
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
