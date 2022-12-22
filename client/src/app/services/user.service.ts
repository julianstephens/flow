import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  prefix = "/users";

  constructor(private apiSVC: ApiService) {}

  private handleError(err: any) {
    return throwError(() => err || "Server error");
  }

  getUserByEmail<UserModel>(email: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set("email", email);
    try {
      this.apiSVC.get<UserModel>(this.prefix, { params });
    } catch (err) {
      this.handleError(err);
    }
  }

  // post<T>(url: string, body: any, options?: any) {
  //   return this.apiSVC.post<T>(URI + url, { headers: this.headers, ...options });
  // }

  // put<T>(url: string, body: any, options?: any) {
  //   return this.apiSVC.put<T>(URI + url, { headers: this.headers, ...options });
  // }

  // delete<T>(url: string, options?: any) {
  //   return this.apiSVC.delete<T>(URI + url, { headers: this.headers, ...options });
  // }
}
