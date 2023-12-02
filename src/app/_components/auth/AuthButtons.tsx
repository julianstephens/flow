"use client";
import { signIn, signOut } from "next-auth/react";
import type { Props } from "~/types";
import { FaDiscord, FaGoogle, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import type React from "react";
import { capitalize } from "~/utils/helpers";

const providers: Record<string, React.ReactNode> = {
    google: <FaGoogle />,
    discord: <FaDiscord />,
};

export const SignInButton = () => (
    <Link href="/auth/login" className="button">
        Sign In
    </Link>
);

export const OauthSignInButtons = () => (
    <>
        <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400" />
            <span className="mx-4 flex-shrink text-grey">or</span>
            <div className="flex-grow border-t border-gray-400" />
        </div>
        <div className="col items-center gap-3">
            {Object.keys(providers).map((p, i) => (
                <button
                    type="button"
                    key={i}
                    className="button w-full"
                    onClick={() => signIn(p)}
                >
                    <span className="icon-left">{providers[p]}</span>
                    Sign in with {capitalize(p)}
                </button>
            ))}
        </div>
    </>
);

export const RegisterButton = () => (
    <Link href="/auth/register" className="button">
        Create an account
    </Link>
);

export const LogoutButton = ({ className }: Props.ComponentStyleProps) => {
    const handleSignOut = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await signOut({
            redirect: false,
        });
    };

    return (
        <button
            onClick={(e) => handleSignOut(e)}
            className={`icon-button ${className}`}
        >
            <span className="icon-left">
                <FaSignOutAlt />
            </span>
            Logout
        </button>
    );
};
