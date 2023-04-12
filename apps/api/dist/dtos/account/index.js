"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const z_1 = require("nestjs-zod/z");
const AccountTypeSchema = z_1.z.enum(["credit", "depository", "loan", "other"]);
const SubtypeSchema = z_1.z.enum([
    "401a",
    "401k",
    "403B",
    "457b",
    "529",
    "brokerage",
    "cash isa",
    "crypto exchange",
    "education savings account",
    "ebt",
    "fixed annuity",
    "gic",
    "health reimbursement arrangement",
    "hsa",
    "isa",
    "ira",
    "lif",
    "life insurance",
    "lira",
    "lrif",
    "lrsp",
    "non-custodial wallet",
    "non-taxable brokerage account",
    "other",
    "other insurance",
    "other annuity",
    "prif",
    "rdsp",
    "resp",
    "rlif",
    "rrif",
    "pension",
    "profit sharing plan",
    "retirement",
    "roth",
    "roth 401k",
    "rrsp",
    "sep ira",
    "simple ira",
    "sipp",
    "stock plan",
    "thrift savings plan",
    "tfsa",
    "trust",
    "ugma",
    "utma",
    "variable annuity",
    "credit card",
    "paypal",
    "cd",
    "checking",
    "savings",
    "money market",
    "prepaid",
    "auto",
    "business",
    "commercial",
    "construction",
    "consumer",
    "home equity",
    "loan",
    "mortgage",
    "overdraft",
    "line of credit",
    "student",
    "cash management",
    "keogh",
    "mutual fund",
    "recurring",
    "rewards",
    "safe deposit",
    "sarsep",
    "payroll",
    "null",
]);
const AccountSchema = z_1.z.object({
    plaidAccountId: z_1.z.string().describe("Plaid unique ID for the account"),
    name: z_1.z.string().describe("Name of the account"),
    mask: z_1.z
        .string()
        .describe("Last 2-4 alphanumeric characters of a n account's official account number"),
    officalName: z_1.z.string().describe("Offical name of the account"),
    currentBalance: z_1.z
        .number()
        .describe("Total amount of funds in or owed by the account"),
    availableBalance: z_1.z
        .number()
        .describe("Amount of funds avaliable to be withdrawn from the account"),
    isoCurrencyCode: z_1.z
        .string()
        .describe("ISO-4217 currency code of the balance")
        .nullish(),
    unofficialCurrencyCode: z_1.z
        .string()
        .describe("Unofficial currency code associated with the balance")
        .nullish(),
    type: AccountTypeSchema.describe("Type of the account"),
    subtype: SubtypeSchema.describe("Subtype of the account"),
    itemId: z_1.z.number().describe("Item associated with the account"),
});
class AccountDto extends (0, nestjs_zod_1.createZodDto)(AccountSchema) {
}
exports.AccountDto = AccountDto;
//# sourceMappingURL=index.js.map