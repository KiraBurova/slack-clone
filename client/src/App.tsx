import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import Auth from './screens/Authorization';
import Registration from './screens/Registration';
import Chat from './screens/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import HeaderComponent from './components/Header';

const { Content } = Layout;

const App = (): React.ReactElement => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      setToken(token);
    } else {
      setToken('');
    }
  }, [token]);

  return (
    <>
      <Layout style={{ height: '100%' }}>
        <HeaderComponent />
        <Content>
          <Switch>
            <Route path='/' exact>
              {!!token ? <Chat /> : <Registration />}
            </Route>
            <Route path='/login' exact>
              <Auth />
            </Route>
            <ProtectedRoute isLoggedIn={!!token} path='/chat' component={Chat} />
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

export default App;
