import React from 'react';
import { Layout, Row, Col } from 'antd';
import {
  Switch,
  Route
} from "react-router-dom";
import FormComponent from './components/Form';

const { Content } = Layout;

const App = () => {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Content>
          <Switch>
            <Route path="/login">
              <Row style={{ height: '100%' }} type="flex" justify="space-around" align="middle">
                <Col span={4}>
                  <FormComponent />
                </Col>
              </Row>
            </Route>
            <Route path="/">
              <Row style={{ height: '100%' }} type="flex" justify="space-around" align="middle">
                <Col span={4}>
                  <FormComponent registration />
                </Col>
              </Row>
            </Route>
          </Switch>
        </Content>
      </Layout >
    </>
  );
}

export default App;
