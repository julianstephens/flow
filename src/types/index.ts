import type { Session } from "next-auth";
import type * as Props from "./props";

export { Props };

export type SessionWrapper = {
    authenticated: boolean;
    session: Session;
};

export type ValidationError = {
    key: string;
    values?: Record<string, any>;
};
