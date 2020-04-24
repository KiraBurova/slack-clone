import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import Sidebar from '../../components/Sidebar';
import MessageInput from '../../components/Chat/Messages/MessageInput';
import ChatComponent from '../../components/Chat';

const { Footer, Sider, Content } = Layout;

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
                <ChatComponent />
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
