import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'


const increment = createAction<number, 'increment'>('increment')
const decrement = createAction<number, 'decrement'>('decrement')

const counter = createReducer(0, {
    [increment.type]: (state, action) => {
      // action is any here
    },
    [decrement.type]: (state, action: PayloadAction<string>) => {
      // even though action should actually be PayloadAction<number>, TypeScript can't detect that and won't give a warning here.
    }
  });

  export default counter;