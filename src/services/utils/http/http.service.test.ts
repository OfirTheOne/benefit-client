/**
 * Tests HttpClientService class
 *
 * @group services
 * @group httpClient
 */

export {};

describe('empty HttpClientService', () => {
  it('empty', () => { console.log('empty'); });
});
/*
import { AxiosRequestConfig } from 'axios';
import { HttpClientService, MethodOption } from './http.service';

xdescribe('HttpClientService', () => {
  let service: HttpClientService;
  let loggerDebugMock: jest.Mock;
  const url = 'http://domain.com';
  const body = 'This is the body';
  const options: AxiosRequestConfig = {
    headers: {
      myHeader: 'demo',
    },
  };
  const axiosMock = jest.fn();

  beforeEach(async () => {
    loggerDebugMock = jest.fn();

    service = new HttpClientService();
  });

  it('should process http POST request', async () => {
    // given
    // when
    await service.post(url, body, options);
    // test
    expect(axiosMock).toBeCalledWith({ url, data: body, ...options, method: MethodOption.POST });
  });

  it('should process http PATCH request', async () => {
    // given
    // when
    await service.patch(url, body, options);
    // test
    expect(axiosMock).toBeCalledWith({ url, data: body, ...options, method: MethodOption.PATCH });
  });

  it('should process http DELETE request', async () => {
    // given
    // when
    await service.delete(url, body, options);
    // test
    expect(axiosMock).toBeCalledWith({ url, data: body, ...options, method: MethodOption.DELETE });
  });

  it('should process http PUT request', async () => {
    // given
    // when
    await service.put(url, body, options);
    // test
    expect(axiosMock).toBeCalledWith({ url, data: body, ...options, method: MethodOption.PUT });
  });

  it('should process http GET request and delete "Authorization" header', async () => {
    // given
    const optionWithAuth = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: 'my Authorization',
      },
    };
    const expectedLoggedOption = {
      ...options,
      url,
      method: MethodOption.GET,
    };
    // when
    await service.get(url, optionWithAuth);
    // test
    expect(axiosMock).toBeCalledWith({ url, ...optionWithAuth, method: MethodOption.GET });
    expect(loggerDebugMock).toBeCalledWith(`[HttpClientService:send] Sending request with configuration: %o`, { messageParams: [expectedLoggedOption] });
  });
});

*/