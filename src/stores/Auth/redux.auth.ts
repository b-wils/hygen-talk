import { combineReducers } from 'redux';
import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';

import { setAuthorizationToken } from 'util/configureAxios';

import Types from 'MyTypes';
import { ErrorPayload } from '../api';

// Constants
export const reducerPath = 'auth';
export const tokenStoragePath = 'authToken';

// Model
export interface Auth {
  text: string;
  id?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResults {
  token: string;
}

// Actions
const logoutAsync = createAsyncAction(
  'auth/LOGOUT_REQUEST',
  'auth/LOGOUT_SUCCESS',
  'auth/LOGOUT_FAILURE',
  'auth/LOGOUT_CANCEL',
)<undefined, undefined, ErrorPayload, string>();

const loginAsync = createAsyncAction(
  'auth/LOGIN_REQUEST',
  'auth/LOGIN_SUCCESS',
  'auth/LOGIN_FAILURE',
  'auth/LOGIN_CANCEL',
)<LoginCredentials, undefined, ErrorPayload, string>();

export const actions = {
  logoutAsync,
  loginAsync,
};

// Types
export interface AuthsState {
  auth: {
    userId?: number;
    loggedIn: boolean;
  };
}

export type AuthsAction = ActionType<typeof actions>;

// Initial state
const token = localStorage.getItem(tokenStoragePath);

if (token) {
  setAuthorizationToken(token);
}

const initialState: AuthsState = {
  auth: token ? { loggedIn: true } : { loggedIn: false },
};

// Reducers
export const reducer = combineReducers<AuthsState, AuthsAction>({
  auth: createReducer(initialState.auth)
    .handleAction(loginAsync.success, () => {
      return { loggedIn: true };
    })
    .handleAction(logoutAsync.success, () => {
      return { loggedIn: false };
    }),
});

// Selectors
export const selectors = {
  isLoggedIn: (state: Types.RootState) => state.auth.auth.loggedIn,
};
