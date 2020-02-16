import React from 'react';
import { Row, Col } from 'antd';

import FormComponent from '../../components/Form';

const Auth = (): React.ReactElement => {
  return (
    <Row style={{ height: '100%' }} type="flex" justify="space-around" align="middle">
      <Col span={4}>
        <FormComponent />
      </Col>
    </Row>
  );
}

export default Auth;