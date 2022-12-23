import { Inject, Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { UserCreateRequest, UserResponse, UserUpdateRequest } from "@shared/interfaces";
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { EnvService } from "./env-provider.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  protected axios: Axios;

  timeout = 30_000;

  constructor(private authSVC: AuthService, @Inject(EnvService) private envSVC: EnvService) {
    this.authSVC.getAccessTokenSilently().subscribe((token) => {
      this.axios = axios.create({
        baseURL: this.envSVC.require("apiUri") as string,
        timeout: this.timeout,
        headers: { Authorization: `Bearer ${token}` },
      });
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
    get: (id: number): Promise<AxiosResponse<UserResponse>> => this.request<UserResponse>({
        url: `/users/${id}`,
      }),
    getByEmail: (email: string): Promise<AxiosResponse<UserResponse>> => this.request<UserResponse>({
        url: `/users`,
        params: { email },
      }),
    create: (data: UserCreateRequest): Promise<AxiosResponse<UserResponse>> => this.request<UserResponse, UserCreateRequest>({
        method: "post",
        url: "/users",
        data,
      }),
    update: (id: number, data: UserUpdateRequest): Promise<AxiosResponse<UserResponse>> => this.request<UserResponse, UserUpdateRequest>({
        method: "put",
        url: `/users/${id}`,
        data,
      }),
    delete: (id: number): Promise<AxiosResponse<void>> => this.request({
        method: "delete",
        url: `/users/${id}`,
      }),
  };
}
