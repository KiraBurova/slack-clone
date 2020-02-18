import { createAction } from '@reduxjs/toolkit';

export const registerUserAction = createAction<Object, 'REGISTER_USER'>(
  'REGISTER_USER',
);
export const loginUserAction = createAction<boolean, 'LOGIN_USER'>(
  'LOGIN_USER',
);
