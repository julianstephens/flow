import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// const URI = env.apiURI;
const URI = "";

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

  constructor(private http: HttpClient) {
    this.headers.append("Content-Type", "application/json");
  }

  get<T>(url: string, options?: any): Observable<HttpResponse<T>> {
    return this.http.get<T>(URI + url, {
      headers: this.headers,
      observe: "response",
      ...options,
    }) as Observable<HttpResponse<T>>;
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
