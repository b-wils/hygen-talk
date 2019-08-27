// eslint-disable-next-line prettier/prettier
import { 
  login,
} from './api.auth';

import { actions, LoginCredentials, tokenStoragePath } from './redux.auth';

import { setAuthorizationToken, removeAuthroizationToken } from '../../util/configureAxios';
import { Dispatch } from 'redux';

// eslint-disable-next-line prettier/prettier
const { 
  loginAsync,
  logoutAsync,
} = actions;

// Hand written thunks
export const loginThunk = (loginCredentials: LoginCredentials) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loginAsync.request(loginCredentials));
  const [error, result] = await login(loginCredentials);

  if (error) {
    dispatch(loginAsync.failure(error));
  } else if (result) {
    // if !error then result exists, typescript can't quite infer this though
    const token = result.data.token;

    localStorage.setItem(tokenStoragePath, token);
    setAuthorizationToken(token);

    dispatch(loginAsync.success());
  }
};

// Technically not a thunk, but we should future proof
export const logoutThunk = () => async (dispatch: Dispatch): Promise<void> => {
  // TODO should we push url here instead of using <Redirect> in component?
  localStorage.removeItem(tokenStoragePath);
  removeAuthroizationToken();
  dispatch(logoutAsync.success());
};

// Generated thunks

export default {
  logoutThunk,
  loginThunk,
};
