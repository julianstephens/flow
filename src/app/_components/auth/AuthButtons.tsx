"use client";
import { signOut } from "next-auth/react";
import type { Props } from "~/types";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import type React from "react";

export const SignInButton = () => (
    <Link href="/auth/login" className="button">
        Sign In
    </Link>
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
