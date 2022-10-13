import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  set value(payload: any) {
    if (typeof payload === "string") {
      localStorage.setItem(this.key, payload);
    } else if (typeof payload === "object") {
      localStorage.setItem(this.key, JSON.stringify(payload));
    } else {
      throw new Error("LocalStorage Error: 'value' can only be a string or an object.");
    }
  }

  get value(): any {
    let res;
    const payload = localStorage.getItem(this.key);

    if (!payload) throw new Error(`LocalStorage Error: no value exists for 'key' <${this.key}>`);

    try {
      res = JSON.parse(payload);
    } catch {
      res = <string>payload;
    }

    return res;
  }

  static clear() {
    localStorage.clear();
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
