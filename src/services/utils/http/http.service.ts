import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export abstract class HttpClientService {
  protected _httpClient: AxiosInstance;

  constructor(baseURL?: string) {
    const httpClientConfiguration: AxiosRequestConfig = {
      baseURL,
      withCredentials: true,
    };

    this._httpClient = axios.create(httpClientConfiguration);
  }

  post<T>(url: string, data: unknown, options: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this._httpClient.post(url, data, options);
  }

  put<T>(url: string, data: unknown, options: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this._httpClient.put(url, data, options);
  }

  get<T>(url: string, options: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this._httpClient.get(url, options);
  }

  delete<T>(url: string, options: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this._httpClient.delete(url, options);
  }

  patch<T>(url: string, data: unknown, options: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this._httpClient.patch(url, data, options);
  }
}
