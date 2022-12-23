import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { Config, UserCreateRequest, UserResponse, UserUpdateRequest } from "./interfaces";

export default class FlowSDK {
  config: Config;
  axios: Axios;

  constructor(config: Config) {
    this.config = config;
    if (!this.config.accessToken) {
      throw new Error("Access Token must be provided.");
    }

    if (!this.config.baseUrl) {
      throw new Error("API URL must be provided.");
    }

    this.axios = axios.create({
      url: this.config.baseUrl,
      timeout: this.config.maxTimeoutMS ?? 60_000,
      headers: { Authorization: `Bearer ${this.config.accessToken}` },
    });
  }

  request = async <ResourceData, ResourceRequest = unknown>(
    req: AxiosRequestConfig<ResourceRequest>,
  ): Promise<AxiosResponse<ResourceData>> => {
    return axios.request({ ...req });
  };

  readonly users = {
    getUser: (id: number): Promise<AxiosResponse<UserResponse>> => {
      return this.axios.request<UserResponse>({
        url: `/users/${id}`,
      });
    },
    createUser: (data: UserCreateRequest): Promise<AxiosResponse<UserResponse>> => {
      return this.axios.request<UserResponse, AxiosResponse<UserResponse>, UserCreateRequest>({
        url: "/users",
        data,
      });
    },
    updateUser: (id: number, data: UserUpdateRequest): Promise<AxiosResponse<UserResponse>> => {
      return this.axios.request<UserResponse, AxiosResponse<UserResponse>, UserUpdateRequest>({
        url: `/users/${id}`,
        data,
      });
    },
    deleteUser: (id: number): Promise<AxiosResponse<void>> => {
      return this.axios.request({
        url: `/users/${id}`,
      });
    },
  };
}
