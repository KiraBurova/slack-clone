import { createAction } from '@reduxjs/toolkit';

export const registerUserAction = createAction<Object, 'REGISTER_USER'>('REGISTER_USER');
export const loginUser = createAction<Object, 'LOGIN_USER'>('LOGIN_USER');