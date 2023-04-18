import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { Prisma, User } from "db";
import { environment as env } from "env/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  protected axios: Axios;
  timeout = 30_000;

  constructor(private authSVC: AuthService) {
    this.authSVC.getAccessTokenSilently().subscribe((token) => {
      this.axios = axios.create({
        baseURL: env.apiUri,
        timeout: this.timeout,
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  }

  async request<ResourceData, ResourceRequest = unknown>(
    req: AxiosRequestConfig<ResourceRequest>
  ): Promise<AxiosResponse<ResourceData>> {
    return this.axios.request<
      ResourceData,
      AxiosResponse<ResourceData>,
      ResourceRequest
    >({
      ...req,
    });
  }

  async ping(): Promise<AxiosResponse<any>> {
    return this.request<string>({
      url: "/ping",
    });
  }

  readonly users = {
    get: (id: number): Promise<AxiosResponse<User>> =>
      this.request<User>({
        url: `/users`,
        params: { id },
      }),
    getByEmail: (email: string): Promise<AxiosResponse<User>> =>
      this.request<User>({
        url: `/users`,
        params: { email },
      }),
    create: (data: Prisma.UserCreateInput): Promise<AxiosResponse<User>> =>
      this.request<User, Prisma.UserCreateInput>({
        method: "post",
        url: "/users",
        data,
      }),
    update: (
      id: number,
      data: Prisma.UserUpdateInput
    ): Promise<AxiosResponse<User>> =>
      this.request<User, Prisma.UserUpdateInput>({
        method: "put",
        url: `/users/${id}`,
        data,
      }),
    delete: (id: number): Promise<AxiosResponse<User>> =>
      this.request({
        method: "delete",
        url: `/users/${id}`,
      }),
  };
}
