"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX = exports.MIN = exports.REQUIRED = void 0;
const REQUIRED = (param, prefix, suffix) => `${prefix ? `${prefix} ` : ""}${param} is required${suffix ? ` ${suffix}` : ""}`;
exports.REQUIRED = REQUIRED;
const MIN = (param, min = 1) => `At least ${min} ${param}(s) required`;
exports.MIN = MIN;
const MAX = (param, max = 1) => `Maximum ${max} ${param}(s) required`;
exports.MAX = MAX;
//# sourceMappingURL=error-msg.js.map