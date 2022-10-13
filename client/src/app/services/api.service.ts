import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// const URI = env.apiURI;
const URI = ""

@Injectable({
  providedIn: "root",
})
export class ApiService {
  headers: Headers = new Headers();

  constructor(private http: HttpClient) {
    this.headers.append("Content-Type", "application/json");
  }

  get<T>(url: string, options?: any) {
    return this.http.get<T>(URI + url, { headers: this.headers, ...options });
  }

  post<T>(url: string, body: any, options?: any) {
    return this.http.post<T>(URI + url, { headers: this.headers, ...options });
  }

  put<T>(url: string, body: any, options?: any) {
    return this.http.put<T>(URI + url, { headers: this.headers, ...options });
  }

  delete<T>(url: string, options?: any) {
    return this.http.delete<T>(URI + url, { headers: this.headers, ...options });
  }
}
