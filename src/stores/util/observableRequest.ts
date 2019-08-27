import { from } from 'rxjs';
import axios, { AxiosRequestConfig } from 'axios';

const observableRequest = <payloadType>(config: AxiosRequestConfig) => {
  return from(axios.request<payloadType>(config));
};

export default observableRequest;
