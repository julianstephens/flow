import { registerConnectionProvider } from "@tsed/ioredis";
import Redis from "ioredis";

const { REDIS_URL } = process.env;
if (!REDIS_URL) throw Error("REDIS_URL env var not set.");

export type REDIS_CONNECTION = Redis;
// eslint-disable-next-line
export const REDIS_CONNECTION = Symbol.for("REDIS_CONNECTION");

registerConnectionProvider({
  provide: REDIS_CONNECTION,
  name: "default",
});
