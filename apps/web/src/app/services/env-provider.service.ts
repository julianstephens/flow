import { Injectable } from "@angular/core";
import { IEnvironment } from "@shared/interfaces/index";
import { environment as env } from "../../environments/environment";

type EnvResponse = string | boolean;
type OptionalEnvResponse = EnvResponse | undefined;

@Injectable({
  providedIn: "root",
})
export class EnvService {
  constructor() {}

  require(key: string): EnvResponse {
    const value = env[key as keyof IEnvironment];

    if (!value) throw new Error(`EnvProvider Error: no value exists for key <${key}>`);

    if (typeof value === "object")
      throw new Error(
        `EnvProvider Error: more specific key needed; value at key <${key}> is an object`,
      );

    return value;
  }

  optional(key: string): OptionalEnvResponse {
    const value = env[key as keyof IEnvironment];
    if (typeof value === "object")
      throw new Error(
        `EnvProvider Error: more specific key needed; value at key <${key}> is an object`,
      );

    return value;
  }
}
