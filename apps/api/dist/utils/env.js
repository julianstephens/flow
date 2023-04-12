"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    API_NAME: (0, envalid_1.str)(),
    API_VERSION: (0, envalid_1.str)({ default: "1" }),
    NODE_ENV: (0, envalid_1.str)({ choices: ["development", "test", "production", "staging"] }),
});
exports.default = env;
//# sourceMappingURL=env.js.map