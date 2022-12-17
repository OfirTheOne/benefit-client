import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import log from 'loglevel';
import { cloneDeep, isEqual } from 'lodash';
import { getStore } from '../../redux/store';
import jwt from 'jsonwebtoken';
import { JwtTokenData } from '../../types/jwt-data';
import { setUserJWTRoles } from '../../redux/features/authorization/authorization.slice';
import { clearStorage, getJwt, setJwt } from '../adapters/local-storage-adapter/local-storage.adapter';
import { v4 as uuidV4 } from 'uuid';


const debugHttpClient = true;

const routerBasePrefix = '/'

export abstract class BaseHttpClientService {
  protected abstract _httpClient: AxiosInstance;

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


export class HttpClientService extends BaseHttpClientService {
  protected _httpClient: AxiosInstance;
  // private _xfnId?: string;
  private _jwt?: string;

  constructor(baseURL?: string) {
    super()
    const savedJwt = getJwt();
    if (savedJwt) {
      this._jwt = savedJwt;
    }

    this._httpClient = axios.create({ baseURL, withCredentials: true });
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this._httpClient.interceptors.request.use((config) => {
      const additionalHeaders: Record<string, string> = {
        'current-url': window.location.href.replace(window.location.search, ''),
        'trace-id': uuidV4(),
      };
      if (this._jwt !== undefined) {
        additionalHeaders['authorization'] = `Bearer ${this._jwt}`;
      }
      config.headers = { ...config.headers, ...additionalHeaders, };
      if (debugHttpClient) {
        log.debug(`[HttpClientService:send] Sending request with configuration: %o`,
          { messageParams: [this.sanitizeOptions(config)] });
      }
      return config;
    });

    this._httpClient.interceptors.response.use(
      (response) => {
        if (debugHttpClient) {
          log.debug('[HttpClientService:receive] Received response data %o', { responseData: response });
        }

        let newJwt = response.headers['c3jwt'];
        const contentType = response.headers['content-type'];
        let responseBody;

        if (contentType?.toLowerCase().startsWith('application/json')) {
          responseBody = response.data;
          if (responseBody && responseBody['c3jwt']) {
            newJwt = responseBody['c3jwt'];
            delete responseBody['c3jwt'];
          }
        }

        if (!newJwt) return response;

        if (this._jwt && this._jwt === newJwt) {
          const decodedTokenData = jwt.decode(newJwt) as JwtTokenData;
          const store = getStore();
          store.dispatch(setUserJWTRoles(decodedTokenData.user));
          return { ...response, data: responseBody || response.data };
        }
        this.updateUserRolesBaseOnJwt(newJwt);
        this._jwt = newJwt;
        setJwt(newJwt);
        return { ...response, data: responseBody || response.data };
      },
      (error) => {
        return this.handleErrorRedirects(error);
      },
    );
  }

  private handleErrorRedirects = (error: AxiosError<{ redirectURL: string }>) => {
    if (error.response && error.response.status === 401) {
      clearStorage();
      const { data } = error.response;
      window.location.href = data?.redirectURL ?? `${window.location.protocol}//${window.location.host}${routerBasePrefix}unauthorized`;
      return;
    }
    // Only when login flow fails we will get redirect to oops page.
    if (error.response?.config?.url?.includes('login') && error.response.status >= 500) {
      window.location.href = `${window.location.protocol}//${window.location.host}${routerBasePrefix}oops`;
    }
    // here we are already in the console site, so only reject error.
    return Promise.reject(error);
  };

  private updateUserRolesBaseOnJwt = (newJwt: string) => {
    const storedTokenData = this._jwt ? (jwt.decode(this._jwt) as JwtTokenData) : undefined;
    const decodedTokenData = jwt.decode(newJwt) as JwtTokenData;

    if (decodedTokenData && decodedTokenData.user) {
      const store = getStore();
      const currentUserRoles = store.getState().authorizationState.userJWTRoles;
      const currentUserData = storedTokenData?.user;
      const newUserData = decodedTokenData.user;
      if (!isEqual(currentUserData, newUserData) || !currentUserRoles) {
        if (debugHttpClient) {
          log.debug(`[HttpClientService:receive] Dispatching setUserJWTRoles with payload %o`, decodedTokenData.user);
        }
        store.dispatch(setUserJWTRoles(decodedTokenData.user));
      }
    }
  };

  private sanitizeOptions(config: AxiosRequestConfig) {
    const sanitizedConfig = cloneDeep(config);
    if (sanitizedConfig.headers?.Authorization) delete sanitizedConfig.headers.Authorization;
    return sanitizedConfig;
  }


}

let httpClientService: HttpClientService;
export function getHttpService(): HttpClientService {
  if (!httpClientService) {
    httpClientService = new HttpClientService();
  }
  return httpClientService;
}
