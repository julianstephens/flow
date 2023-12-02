import { env } from "~/env";
import Link from "next/link";
import type { Props } from "~/types";

const Brand = ({ className }: Props.ComponentStyleProps) => (
    <span className={`font-logo ${className}`}>{env.NEXT_PUBLIC_APP_NAME}</span>
);

export const AppBrand = ({
    className,
    linkHome,
}: Props.ComponentStyleProps & { linkHome?: boolean }) =>
    linkHome ? (
        <Link href="/">
            <Brand className={className} />
        </Link>
    ) : (
        <Brand />
    );
