import { Injectable } from "@angular/core";
import { IEnvironment } from "@app/models/common.models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EnvProviderService {
  constructor() {}

  require(key: string) {
    const value = environment[key as keyof IEnvironment];

    if (!value) throw new Error(`EnvProvider Error: no value exists for 'key' <${key}>`);

    return value;
  }

  optional(key: string) {
    return environment[key as keyof IEnvironment];
  }
}
