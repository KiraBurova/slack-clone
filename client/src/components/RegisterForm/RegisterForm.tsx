import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'antd';

import { useMutation } from '@apollo/react-hooks';

import { User } from '../../type';
import { FormComponentProps } from './types';
import { REGISTER_USER } from './mutations';

import FormComponent from '../Form';

const FormContainer = ({ form, registration }: FormComponentProps) => {
  const history = useHistory();
  const [validationError, setError] = useState('');
  const [
    registerUserMutation,
    { error: registerError, loading: registerLoading },
  ] = useMutation(REGISTER_USER, {
    onError(error) {
      console.log(error);
      return error;
    },
    onCompleted() {
      console.log('login');
      history.push('/login');
    },
  });

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    form.validateFields((err: Object, values: User): void => {
      if (!err && values.password === values.repeat_password) {
        setError('');
        registerUserMutation({
          variables: {
            registerInput: {
              username: values.username,
              password: values.password,
            },
          },
        });
      } else if (
        values.password &&
        values.repeat_password &&
        values.password !== values.repeat_password
      ) {
        const errorMessage = 'The passwords must match!';

        setError(errorMessage);
      }
    });
  };

  return (
    <FormComponent
      actionError={registerError}
      loading={registerLoading}
      validationError={validationError}
      form={form}
      handleAction={handleRegisterUser}
      registration={registration}
    />
  );
};

export default Form.create<FormComponentProps>()(FormContainer);
