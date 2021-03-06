import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';

import { Form } from 'antd';

import { UserType } from '../../types/types';
import { FormComponentProps } from './types';

import { LOGIN_USER_MUTATION } from './mutations';

import FormComponent from '../Form';

const FormContainer = ({
  form,
  registration,
  loginUserAction,
}: FormComponentProps): React.ReactElement => {
  const history = useHistory();
  const [validationError, setError] = useState('');
  const [loginUserMutation, { error: loginError, loading: loginLoading }] = useMutation(
    LOGIN_USER_MUTATION,
    {
      onError(error) {
        return error;
      },
      onCompleted(data) {
        const token = data.loginUser.token;
        localStorage.setItem('token', token);

        if (token) {
          history.push('/chat');
        }
      },
    },
  );

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    form.validateFields(['username', 'password'], (err: Object, values: UserType): void => {
      if (!err) {
        setError('');
        loginUserAction(true);
        loginUserMutation({
          variables: {
            loginInput: {
              username: values.username,
              password: values.password,
            },
          },
        });
      } else {
        const errorMessage = 'The passwords must match!';
        loginUserAction(false);
        setError(errorMessage);
      }
    });
  };

  return (
    <FormComponent
      actionError={loginError}
      loading={loginLoading}
      validationError={validationError}
      form={form}
      handleAction={handleLoginUser}
      registration={registration}
    />
  );
};

export default Form.create<FormComponentProps>()(FormContainer);
