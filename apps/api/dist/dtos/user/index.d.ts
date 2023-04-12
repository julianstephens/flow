import { z } from "nestjs-zod/z";
declare const UserDto_base: import("nestjs-zod").ZodDto<{
    email: string;
    password: string;
    fname?: string | null | undefined;
    lname?: string | null | undefined;
}, z.ZodObjectDef<{
    email: z.ZodString;
    password: z.ZodPassword;
    fname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny>, {
    email: string;
    password: string;
    fname?: string | null | undefined;
    lname?: string | null | undefined;
}>;
export declare class UserDto extends UserDto_base {
}
export {};
//# sourceMappingURL=index.d.ts.map