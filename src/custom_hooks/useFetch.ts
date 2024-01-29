import { useCallback, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { TFetchResponse } from "../Types/Fetching";

const BASE_URL = "http://localhost:8000/api/";

type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export default function useFetch<T>(): TFetchResponse<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [responseData, setResponseData] = useState<T | T[]>();

  const sendRequest = useCallback(
    (
      requestConfig: AxiosRequestConfig,
      callbackFunction?: (data?: T) => {} | undefined
    ): void => {
      setLoading(true);
      axios
        .request({
          baseURL: BASE_URL,
          ...requestConfig,
        })
        .then((res: AxiosResponse) => {
          if (res.status >= 200 && res.status < 300) {
            setResponseData(res.data);
            callbackFunction && callbackFunction(res.data);
          } else {
            throw Error(res.data);
          }
        })
        .catch((err) => {
          setError(err);
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  return { loading, error, responseData, sendRequest };
}
