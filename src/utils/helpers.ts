import { z } from "zod";

export const nonempty = z
    .string()
    .transform((t) => t?.trim())
    .pipe(z.string().min(1));

export const capitalize = (val: string) =>
    `${val[0]?.toUpperCase()}${val.slice(1)}`;
