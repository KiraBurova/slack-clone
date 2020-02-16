import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import { Layout } from 'antd';

import Auth from './screens/Authorization';
import Registration from './screens/Registration';
import Chat from './screens/Chat';

const { Content } = Layout;

const App = (): React.ReactElement => {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Content>
          <Switch>
            <Route path="/" exact>
              <Registration />
            </Route>
            <Route path="/login" exact>
              <Auth />
            </Route>
            <Route path="/chat" exact>
              <Chat />
            </Route>
          </Switch>
        </Content>
      </Layout >
    </>
  );
}

export default App;
