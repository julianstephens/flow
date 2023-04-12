import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  API_NAME: str(),
  API_VERSION: str({ default: "1" }),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});

export default env;
