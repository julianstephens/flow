import { z } from "nestjs-zod/z";
declare const AccountDto_base: import("nestjs-zod").ZodDto<{
    plaidAccountId: string;
    name: string;
    mask: string;
    officalName: string;
    currentBalance: number;
    availableBalance: number;
    type: "credit" | "depository" | "loan" | "other";
    subtype: "loan" | "other" | "401a" | "401k" | "403B" | "457b" | "529" | "brokerage" | "cash isa" | "crypto exchange" | "education savings account" | "ebt" | "fixed annuity" | "gic" | "health reimbursement arrangement" | "hsa" | "isa" | "ira" | "lif" | "life insurance" | "lira" | "lrif" | "lrsp" | "non-custodial wallet" | "non-taxable brokerage account" | "other insurance" | "other annuity" | "prif" | "rdsp" | "resp" | "rlif" | "rrif" | "pension" | "profit sharing plan" | "retirement" | "roth" | "roth 401k" | "rrsp" | "sep ira" | "simple ira" | "sipp" | "stock plan" | "thrift savings plan" | "tfsa" | "trust" | "ugma" | "utma" | "variable annuity" | "credit card" | "paypal" | "cd" | "checking" | "savings" | "money market" | "prepaid" | "auto" | "business" | "commercial" | "construction" | "consumer" | "home equity" | "mortgage" | "overdraft" | "line of credit" | "student" | "cash management" | "keogh" | "mutual fund" | "recurring" | "rewards" | "safe deposit" | "sarsep" | "payroll" | "null";
    itemId: number;
    isoCurrencyCode?: string | null | undefined;
    unofficialCurrencyCode?: string | null | undefined;
}, z.ZodObjectDef<{
    plaidAccountId: z.ZodString;
    name: z.ZodString;
    mask: z.ZodString;
    officalName: z.ZodString;
    currentBalance: z.ZodNumber;
    availableBalance: z.ZodNumber;
    isoCurrencyCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    unofficialCurrencyCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodEnum<["credit", "depository", "loan", "other"]>;
    subtype: z.ZodEnum<["401a", "401k", "403B", "457b", "529", "brokerage", "cash isa", "crypto exchange", "education savings account", "ebt", "fixed annuity", "gic", "health reimbursement arrangement", "hsa", "isa", "ira", "lif", "life insurance", "lira", "lrif", "lrsp", "non-custodial wallet", "non-taxable brokerage account", "other", "other insurance", "other annuity", "prif", "rdsp", "resp", "rlif", "rrif", "pension", "profit sharing plan", "retirement", "roth", "roth 401k", "rrsp", "sep ira", "simple ira", "sipp", "stock plan", "thrift savings plan", "tfsa", "trust", "ugma", "utma", "variable annuity", "credit card", "paypal", "cd", "checking", "savings", "money market", "prepaid", "auto", "business", "commercial", "construction", "consumer", "home equity", "loan", "mortgage", "overdraft", "line of credit", "student", "cash management", "keogh", "mutual fund", "recurring", "rewards", "safe deposit", "sarsep", "payroll", "null"]>;
    itemId: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    plaidAccountId: string;
    name: string;
    mask: string;
    officalName: string;
    currentBalance: number;
    availableBalance: number;
    type: "credit" | "depository" | "loan" | "other";
    subtype: "loan" | "other" | "401a" | "401k" | "403B" | "457b" | "529" | "brokerage" | "cash isa" | "crypto exchange" | "education savings account" | "ebt" | "fixed annuity" | "gic" | "health reimbursement arrangement" | "hsa" | "isa" | "ira" | "lif" | "life insurance" | "lira" | "lrif" | "lrsp" | "non-custodial wallet" | "non-taxable brokerage account" | "other insurance" | "other annuity" | "prif" | "rdsp" | "resp" | "rlif" | "rrif" | "pension" | "profit sharing plan" | "retirement" | "roth" | "roth 401k" | "rrsp" | "sep ira" | "simple ira" | "sipp" | "stock plan" | "thrift savings plan" | "tfsa" | "trust" | "ugma" | "utma" | "variable annuity" | "credit card" | "paypal" | "cd" | "checking" | "savings" | "money market" | "prepaid" | "auto" | "business" | "commercial" | "construction" | "consumer" | "home equity" | "mortgage" | "overdraft" | "line of credit" | "student" | "cash management" | "keogh" | "mutual fund" | "recurring" | "rewards" | "safe deposit" | "sarsep" | "payroll" | "null";
    itemId: number;
    isoCurrencyCode?: string | null | undefined;
    unofficialCurrencyCode?: string | null | undefined;
}>;
export declare class AccountDto extends AccountDto_base {
}
export {};
//# sourceMappingURL=index.d.ts.map