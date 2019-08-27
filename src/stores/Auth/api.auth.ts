import apiCall from '../util/apiCall';

import { LoginCredentials, LoginResults } from './redux.auth';

// API
export const login = (loginCredentials: LoginCredentials) => {
  return apiCall<LoginResults>({ url: 'login', method: 'POST', data: loginCredentials });
};
