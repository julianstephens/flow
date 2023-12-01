import { env } from "~/env";
import type { Props } from "~/types";

export const AppBrand = ({ className }: Props.ComponentStyleProps) => (
    <span className={`font-logo ${className}`}>{env.NEXT_PUBLIC_APP_NAME}</span>
);
