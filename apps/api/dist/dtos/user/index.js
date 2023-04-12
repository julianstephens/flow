"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const utils_1 = require("../../utils");
const nestjs_zod_1 = require("nestjs-zod");
const z_1 = require("nestjs-zod/z");
const UserSchema = z_1.z.object({
    email: z_1.z.string().email().describe("User's email address"),
    password: z_1.z
        .password()
        .min(8)
        .max(100)
        .atLeastOne("digit", { message: (0, utils_1.MIN)("digit") })
        .atLeastOne("special", { message: (0, utils_1.MIN)("special character") })
        .atLeastOne("lowercase", { message: (0, utils_1.MIN)("uppercase character") })
        .atLeastOne("uppercase", { message: (0, utils_1.MIN)("uppercase character") })
        .describe("User's password"),
    fname: z_1.z.string().nullish().describe("User's first name"),
    lname: z_1.z.string().nullish().describe("User's last name"),
});
class UserDto extends (0, nestjs_zod_1.createZodDto)(UserSchema) {
}
exports.UserDto = UserDto;
//# sourceMappingURL=index.js.map