"use client";

import type { SignInResponse } from "next-auth/react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useInterval } from "usehooks-ts";
import { AppBrand } from "~/app/_components/Brand";
import type { SessionWrapper } from "~/types";

const LoginPage = () => {
    const router = useRouter();
    const [providers] = useState(["google", "discord"]);

    const validateSession = async () => {
        const session = (await getSession()) as unknown as SessionWrapper;
        if (session.authenticated) {
            router.refresh();
            router.push("/overview");
        }
    };

    const handleSignIn = async (e: React.SyntheticEvent, provider: string) => {
        e.preventDefault();

        const res = (await signIn(provider, {
            redirect: false,
        })) as SignInResponse;

        if (res.error) {
            toast.error(res.error);
        }
    };

    useInterval(() => {
        validateSession();
    }, 1000);

    return (
        <div className="col full centered">
            <form>
                <h3 className="font-bold">
                    Sign in to <AppBrand />
                </h3>
                <div id="oauthButtons">
                    {providers.map((p, i) => (
                        <button
                            className="button"
                            onClick={(e) => handleSignIn(e, p)}
                            key={i}
                        >{`${p[0]?.toUpperCase()}${p.slice(1)}`}</button>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
