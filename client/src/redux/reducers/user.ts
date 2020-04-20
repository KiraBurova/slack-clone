import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { loginUserAction } from '../actions';

const initialState = {
  userLoggedIn: false,
};

const user = createReducer(initialState, {
  [loginUserAction.type]: (state, action: PayloadAction<boolean>) => {
    state.userLoggedIn = action.payload;
  },
});

export default user;
