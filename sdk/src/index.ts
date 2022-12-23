import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { Config, UserCreateRequest, UserResponse, UserUpdateRequest } from "./interfaces";

export default class FlowSDK {
  protected axios: Axios;

  constructor(config: Config) {
    if (!config.accessToken) {
      throw new Error("Access Token must be provided.");
    }

    if (!config.baseUrl) {
      throw new Error("API URL must be provided.");
    }

    this.axios = axios.create({
      baseURL: config.baseUrl,
      timeout: config.maxTimeoutMS ?? 30_000,
      headers: { Authorization: `Bearer ${config.accessToken}` },
    });
  }

  async request<ResourceData, ResourceRequest = unknown>(
    req: AxiosRequestConfig<ResourceRequest>,
  ): Promise<AxiosResponse<ResourceData>> {
    return this.axios.request<ResourceData, AxiosResponse<ResourceData>, ResourceRequest>({
      ...req,
    });
  }

  async ping(): Promise<AxiosResponse<any>> {
    return this.request<string>({
      url: "/ping",
    });
  }

  readonly users = {
    get: (id: number): Promise<AxiosResponse<UserResponse>> => {
      return this.request<UserResponse>({
        url: `/users/${id}`,
      });
    },
    getByEmail: (email: string): Promise<AxiosResponse<UserResponse>> => {
      return this.request<UserResponse>({
        url: `/users`,
        params: { email },
      });
    },
    create: (data: UserCreateRequest): Promise<AxiosResponse<UserResponse>> => {
      return this.request<UserResponse, UserCreateRequest>({
        method: "post",
        url: "/users",
        data,
      });
    },
    update: (id: number, data: UserUpdateRequest): Promise<AxiosResponse<UserResponse>> => {
      return this.request<UserResponse, UserUpdateRequest>({
        method: "put",
        url: `/users/${id}`,
        data,
      });
    },
    delete: (id: number): Promise<AxiosResponse<void>> => {
      return this.request({
        method: "delete",
        url: `/users/${id}`,
      });
    },
  };
}
