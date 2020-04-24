import React from 'react';
import { Link } from 'react-router-dom';

import { ApolloError } from 'apollo-boost';

import { Form, Icon, Input, Button, Alert } from 'antd';

import { requiredField } from '../../helpers';
import { minimumPasswordMessage } from '../../constants';

interface FormComponentProp {
  form: any;
  registration: boolean;
  handleAction: (event: React.FormEvent<HTMLFormElement>) => void;
  validationError: string;
  actionError: ApolloError | undefined;
  loading: boolean;
}

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
        })(<Input placeholder='Password' type='password' prefix={<Icon type='lock' />} />)}
      </Form.Item>
      {registration && (
        <Form.Item>
          {getFieldDecorator('repeat_password', {
            rules: [{ required: true, message: requiredField('password') }],
          })(<Input placeholder='Repeat password' type='password' prefix={<Icon type='lock' />} />)}
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
