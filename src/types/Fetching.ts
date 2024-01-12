import { AxiosRequestConfig } from "axios";

export type TFetchResponse<T> = {
  loading: boolean;
  error?: Object;
  requestData: T | T[] | undefined;
  sendRequest: (
    requestConfig: AxiosRequestConfig,
    callbackFunction?: (data?: T) => {} | undefined
  ) => void;
};
