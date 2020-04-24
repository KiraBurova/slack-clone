import React from 'react';
import { Layout } from 'antd';
import { Link, Switch } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import MessageInput from '../../components/Chat/Messages/MessageInput';
import ChatComponent from '../../components/Chat';
import { useHistory, Route } from 'react-router-dom';

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
