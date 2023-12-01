"use client";
import type { Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Props } from "~/types";

export const AuthProvider = ({ children }: Props.ChildrenProps) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        getSession().then((data) => {
            setSession(data);
        });
    }, []);

    return (
        <SessionProvider
            session={session}
            refetchInterval={3 * 60}
            refetchOnWindowFocus={true}
        >
            {children}
        </SessionProvider>
    );
};
