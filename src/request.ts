import { Logger } from './logger';
import { ElementsHeaders, ErrorResponse, NetworkError } from './network';
import { TokenProvider } from './token-provider';

export interface RequestOptions {
  method: string;
  path: string;
  jwt?: string;
  headers?: ElementsHeaders;
  body?: any;
  logger?: Logger;
  tokenProvider?: TokenProvider;
}

export interface RawRequestOptions {
  method: string;
  url: string;
  headers?: ElementsHeaders;
  body?: any;
  logger?: Logger;
}

// TODO: Could we make this generic and remove the `any`s?
export function executeNetworkRequest(
  createXhr: () => XMLHttpRequest,
  options: RequestOptions,
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const xhr = attachOnReadyStateChangeHandler(createXhr(), resolve, reject);

    xhr.send(JSON.stringify(options.body));
  });
}

export function sendRawRequest(options: RawRequestOptions): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const xhr = attachOnReadyStateChangeHandler(
      new global.XMLHttpRequest(),
      resolve,
      reject,
    );

    xhr.open(options.method.toUpperCase(), options.url, true);

    if (options.headers) {
      for (const key in options.headers) {
        if (options.headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
    }

    xhr.send(options.body);
  });
}

function attachOnReadyStateChangeHandler(
  xhr: XMLHttpRequest,
  resolve: any,
  reject: any,
): XMLHttpRequest {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else if (xhr.status !== 0) {
        reject(ErrorResponse.fromXHR(xhr));
      } else {
        reject(new NetworkError('No Connection'));
      }
    }
  };
  return xhr;
}
