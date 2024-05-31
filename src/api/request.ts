import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestParams<Data, Query extends Object> {
  url: string;
  data?: Data;
  method?: 'post' | 'get';
  headers?: { [key: string]: string };
  query?: Query;
  withCredentials?: boolean;
  timeout?: number;
}

export function request<Data, Response, Query extends Object = any>(params: RequestParams<Data, Query>) {
  const { url, data, method = 'post', headers, query, withCredentials = true, timeout = 60 * 1000 } = params;

  if (!url) {
    console.error('request parameter error, url is empty');
    return;
  }

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: { 'Content-Type': 'application/json', ...headers },
    withCredentials,
    timeout,
  };
  if (data !== undefined) {
    config.data = data;
  }
  if (query !== undefined) {
    config.params = query;
  }

  return new Promise((resolve: (value: Response) => void, reject) => {
    axios(config)
      .then((res: AxiosResponse<Response>) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
