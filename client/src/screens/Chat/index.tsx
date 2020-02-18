import React from 'react';
import { Layout } from 'antd';

import Sidebar from '../../components/Sidebar';

const { Header, Footer, Sider, Content } = Layout;

const Chat = (): React.ReactElement => {
  return (
    <Sider>
      <Sidebar />
    </Sider>
  );
};

export default Chat;
