import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvProvider } from "./env-provider.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  headers: Headers = new Headers();

  options = {
    headers: new Headers(),
    observe: "response",
    responseType: "json",
  };

  uri: string;

  constructor(private http: HttpClient, private envSVC: EnvProvider) {
    this.headers.append("Content-Type", "application/json");
    this.uri = this.envSVC.require("apiUri") as string;
  }

  get<T>(path: string, options?: any) {
    return this.http.get<T>(this.uri + path, {
      headers: this.headers,
      observe: "response",
      ...options,
    });
  }

  post<T>(path: string, body: any, options?: any) {
    return this.http.post<T>(this.uri + path, { headers: this.headers, ...options });
  }

  put<T>(path: string, body: any, options?: any) {
    return this.http.put<T>(this.uri + path, { headers: this.headers, ...options });
  }

  delete<T>(path: string, options?: any) {
    return this.http.delete<T>(this.uri + path, { headers: this.headers, ...options });
  }
}
