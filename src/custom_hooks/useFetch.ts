import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8000/api/";

type Method = "POST" | "GET" | "PUT" | "DELETE";

export default function useFetch(
  url: string,
  method: Method,
  body?: Object
): any {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .request({
        url: url,
        method: method,
        baseURL: BASE_URL,
      })
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, method]);
  return { data, loading, error };
}
