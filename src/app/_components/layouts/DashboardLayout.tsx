import type { Props } from "~/types";
import Link from "next/link";
import { DashboardHeader } from "../DashboardHeader";
import { LogoutButton } from "../auth";
import { AppBrand } from "../Brand";

export const DashboardLayout = ({
    children,
    pageTitle,
}: Props.ChildrenProps & { pageTitle?: string }) => {
    return (
        <main className="full flex">
            <div
                id="sidebar"
                className="col h-full min-w-[16rem] max-w-[18rem] border-r-2 border-r-grey-light p-5"
            >
                <Link href="/overview" className="h3 font-logo">
                    <AppBrand />
                </Link>
                <LogoutButton className="mt-auto" />
            </div>
            <div id="content" className="w-full p-5">
                <div id="header" className="flex w-full justify-around">
                    <DashboardHeader pageTitle={pageTitle} />
                </div>
                {children}
            </div>
        </main>
    );
};
