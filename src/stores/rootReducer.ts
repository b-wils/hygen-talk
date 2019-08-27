import { combineReducers } from 'redux';

import { reducer as apiReducer } from './api';
import * as auth from './Auth';
import * as todos from './Todos';

const rootReducer = combineReducers({
  auth: auth.reducer,
  todos: todos.reducer,
  api: apiReducer,
});

export default rootReducer;
