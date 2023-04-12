"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemDto = void 0;
const utils_1 = require("../../utils");
const nestjs_zod_1 = require("nestjs-zod");
const z_1 = require("nestjs-zod/z");
const ItemSchema = z_1.z.object({
    plaidAccessToken: z_1.z.string().describe("Plaid API authentication token"),
    plaidItemId: z_1.z.string().describe("Plaid Item (institution login) ID"),
    plaidInstitutionId: z_1.z.string().describe("Plaid institution ID"),
    status: z_1.z.string().describe("Object with Plaid Item status info"),
    userId: z_1.z.number().min(1, (0, utils_1.MIN)("ID")).describe("FK user ID"),
});
class ItemDto extends (0, nestjs_zod_1.createZodDto)(ItemSchema) {
}
exports.ItemDto = ItemDto;
//# sourceMappingURL=index.js.map