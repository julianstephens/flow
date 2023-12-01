import type { Props } from "~/types";
import { DashboardLayout } from "../_components/layouts/DashboardLayout";

const Layout = ({ children }: Props.ChildrenProps) => {
    return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
