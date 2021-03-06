import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Alert } from 'antd';

import { requiredField } from '../../helpers';
import { minimumPasswordMessage } from '../../constants';

import { FormComponentProp } from './types';

const FormComponent = ({
  form,
  handleAction,
  registration,
  validationError,
  actionError,
  loading,
}: FormComponentProp) => {
  const { getFieldDecorator } = form;

  const actionButton = (
    <Button htmlType='submit' type='primary' loading={loading}>
      {registration ? 'Register' : 'Log in'}
    </Button>
  );

  const message = registration ? (
    <>
      Or <Link to='/login'>login now!</Link>
    </>
  ) : (
    <>
      Or <Link to='/'>register now!</Link>
    </>
  );

  const formComponent = (
    <Form layout='vertical' onSubmit={handleAction}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: requiredField('username') }],
        })(<Input placeholder='Username' prefix={<Icon type='user' />} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: requiredField('password') },
            { min: 6, message: minimumPasswordMessage },
          ],
        })(<Input.Password placeholder='Password' prefix={<Icon type='lock' />} />)}
      </Form.Item>
      {registration && (
        <Form.Item>
          {getFieldDecorator('repeat_password', {
            rules: [{ required: true, message: requiredField('password') }],
          })(<Input.Password placeholder='Repeat password' prefix={<Icon type='lock' />} />)}
        </Form.Item>
      )}
      {validationError && (
        <Form.Item>
          <Alert type='error' message={validationError} />
        </Form.Item>
      )}
      {actionError && (
        <Form.Item>
          <Alert type='error' message={actionError?.message} />
        </Form.Item>
      )}
      <Form.Item>{actionButton}</Form.Item>
      {message}
    </Form>
  );

  return formComponent;
};

export default FormComponent;
