// Inspired by https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
import { combineReducers } from 'redux';

import { createLoadingSelector, loadingReducer } from './loading.redux';
import { errorReducer, createErrorSelector, ErrorPayload } from './error.redux';

const reducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
});

export type ErrorPayload = ErrorPayload;

export { createLoadingSelector, reducer, createErrorSelector };
