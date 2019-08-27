import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// TODO how do we enforce error shape and account for errors that don't conform, for example if
// request is rejected before it reaches API server
interface ErrorData {
  errors?: [
    {
      userMessage: string;
      internalMessage: string;
      code: string;
    },
  ];
}

export type ErrorResponse = AxiosError<ErrorData>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tuple<T extends any[]>(...data: T) {
  return data;
}

export const apiCall = <ResponseType>({ url, method, data }: AxiosRequestConfig) =>
  axios
    .request<ResponseType>({ url, method, data })
    .then(result => tuple(null, result))
    .catch((error: ErrorResponse) => {
      if (error.response) {
        // Request made and server responded

        if (error.response.data.errors) {
          // API server resonded with error spec
          return tuple(error.response.data.errors.map(error => error.userMessage));
        } else {
          // Response that doesn't match API spec
          return tuple([`Request failed`], null);
        }
      } else if (error.request) {
        // The request was made but no response was received
        return tuple(['No response from request'], null);
      } else {
        // Something happened in setting up the request that triggered an Error
        return tuple(['Failed to send request'], null);
      }
    });

export default apiCall;
