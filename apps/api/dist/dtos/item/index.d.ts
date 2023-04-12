import { z } from "nestjs-zod/z";
declare const ItemDto_base: import("nestjs-zod").ZodDto<{
    status: string;
    plaidAccessToken: string;
    plaidItemId: string;
    plaidInstitutionId: string;
    userId: number;
}, z.ZodObjectDef<{
    plaidAccessToken: z.ZodString;
    plaidItemId: z.ZodString;
    plaidInstitutionId: z.ZodString;
    status: z.ZodString;
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    status: string;
    plaidAccessToken: string;
    plaidItemId: string;
    plaidInstitutionId: string;
    userId: number;
}>;
export declare class ItemDto extends ItemDto_base {
}
export {};
//# sourceMappingURL=index.d.ts.map