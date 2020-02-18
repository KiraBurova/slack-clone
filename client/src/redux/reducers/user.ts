import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { registerUserAction, loginUserAction } from '../actions';

const initialState = {
  userLoggedIn: false,
};

const user = createReducer(initialState, {
  [registerUserAction.type]: (state, action) => {
    console.log(state);
  },
  [loginUserAction.type]: (state, action: PayloadAction<boolean>) => {
    state.userLoggedIn = action.payload;
  },
});

export default user;
