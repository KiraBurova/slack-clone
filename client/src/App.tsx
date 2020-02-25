import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import Auth from './screens/Authorization';
import Registration from './screens/Registration';
import Chat from './screens/Chat';
import ProtectedRoute from './components/ProtectedRoute';

const { Content } = Layout;

const App = (): React.ReactElement => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    } else {
      setToken('');
    }
  }, [token]);

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Content>
          <Switch>
            <Route path='/' exact>
              <Registration />
            </Route>
            <Route path='/login' exact>
              <Auth />
            </Route>
            <ProtectedRoute
              isLoggedIn={!!token}
              exact
              path='/chat'
              component={Chat}
            />
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

export default App;
