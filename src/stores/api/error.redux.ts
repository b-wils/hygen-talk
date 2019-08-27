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

export interface ErrorState {
  [key: string]: string[];
}

export type ErrorPayload = string[];

interface ErrorAction {
  payload: ErrorPayload;
}

export const errorReducer = (state: ErrorState = {}, action: Types.RootAction) => {
  // Hacky way to get a string representation of our async action

  const actionFields = getActionFields(action.type);
  if (!actionFields) return state;

  var errors: string[];

  if (isActionOf(getFailureActions(), action)) {
    // Manually caste since we can't quite get type inference working
    const errorAction = action as ErrorAction;

    errors = errorAction.payload;
  } else if (
    isActionOf(getRequestActions(), action) ||
    isActionOf(getSuccessActions(), action) ||
    isActionOf(getCancelActions(), action)
  ) {
    errors = [];
  } else {
    return state;
  }

  return {
    ...state,
    [actionFields.name]: errors,
  };
};

// Selectors

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createErrorSelector = (asyncActions: [AsyncActionCreator<any, any, any, any>]) => (
  state: Types.RootState,
) => {
  return asyncActions
    .map(asyncAction => {
      const actionFields = getActionFields(getType(asyncAction.request));

      if (!actionFields) return '';

      return state.api.error[actionFields.name];
    })
    .flat();
};
