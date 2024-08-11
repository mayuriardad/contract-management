declare module "axios-mock-adapter" {
  import {
    AxiosInstance,
    AxiosRequestHeaders,
    AxiosResponse,
    AxiosRequestConfig,
  } from "axios";

  interface RequestHandler {
    reply(
      status: number,
      data?: any,
      headers?: AxiosRequestHeaders
    ): MockAdapter;
    reply(
      callback: (
        config: AxiosRequestConfig
      ) => [number, any?, AxiosRequestHeaders?]
    ): MockAdapter;
    replyOnce(
      status: number,
      data?: any,
      headers?: AxiosRequestHeaders
    ): MockAdapter;
    replyOnce(
      callback: (
        config: AxiosRequestConfig
      ) => [number, any?, AxiosRequestHeaders?]
    ): MockAdapter;
    passThrough(): void;
  }

  interface MockAdapterOptions {
    delayResponse?: number;
    onNoMatch?: "passthrough" | "throwException";
  }

  class MockAdapter {
    constructor(axiosInstance: AxiosInstance, options?: MockAdapterOptions);

    onGet(
      url: string,
      body?: any,
      headers?: AxiosRequestHeaders
    ): RequestHandler;
    onPost(
      url: string,
      body?: any,
      headers?: AxiosRequestHeaders
    ): RequestHandler;
    onPut(
      url: string,
      body?: any,
      headers?: AxiosRequestHeaders
    ): RequestHandler;
    onPatch(
      url: string,
      body?: any,
      headers?: AxiosRequestHeaders
    ): RequestHandler;
    onDelete(
      url: string,
      body?: any,
      headers?: AxiosRequestHeaders
    ): RequestHandler;
    onHead(
      url: string,
      body?: any,
      headers?: AxiosRequestHeaders
    ): RequestHandler;
    onAny(
      url: string,
      body?: any,
      headers?: AxiosRequestHeaders
    ): RequestHandler;

    reset(): void;
    restore(): void;
  }

  export default MockAdapter;
}
