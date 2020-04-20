import { createAction } from '@reduxjs/toolkit';

export const loginUserAction = createAction<boolean, 'LOGIN_USER'>(
  'LOGIN_USER',
);
