// Inspired by https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

import { AsyncActionCreator, getType, isActionOf } from 'typesafe-actions';

import {
  getActionFields,
  getCancelActions,
  getFailureActions,
  getRequestActions,
  getSuccessActions,
} from './actionUtils';

import Types from 'MyTypes';

export interface LoadingState {
  [key: string]: boolean;
}

export const loadingReducer = (state: LoadingState = {}, action: Types.RootAction) => {
  var loadingState;

  if (isActionOf(getRequestActions(), action)) {
    loadingState = true;
  } else if (
    isActionOf(getFailureActions(), action) ||
    isActionOf(getSuccessActions(), action) ||
    isActionOf(getCancelActions(), action)
  ) {
    loadingState = false;
  } else {
    return state;
  }

  // Hacky way to get a string representation of our async action
  const actionFields = getActionFields(action.type);
  if (!actionFields) return state;

  return {
    ...state,
    [actionFields.name]: loadingState,
  };
};

// Selectors

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLoadingSelector = (asyncActions: [AsyncActionCreator<any, any, any, any>]) => (
  state: Types.RootState,
) => {
  return asyncActions.some(asyncAction => {
    const actionFields = getActionFields(getType(asyncAction.request));

    if (!actionFields) return false;

    // Undefined check in case request has not been fired yet
    // Without this we start out as not loading
    //
    // TODO: Will this cause bugs when we navigate back to page?
    // Maybe we can clear all set flags on path change?
    // Our data should still be in cache but maybe this is a less than ideal experience since
    // a user would briefly see data before a new load is triggered
    return state.api.loading[actionFields.name];
  });
};
