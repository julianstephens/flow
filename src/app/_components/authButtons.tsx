"use client";
import { signIn, signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export const SignInButton = () => (
    <button
        onClick={() => signIn()}
        className="button bg-blue text-white hover:border-4 hover:border-blue hover:bg-bg hover:text-black"
    >
        Sign In
    </button>
);

export const LogoutButton = () => (
    <button
        onClick={() => signOut()}
        className="button bg-blue text-white hover:border-4 hover:border-blue hover:bg-bg hover:text-black"
    >
        <span>
            <FaSignOutAlt />
        </span>
        Logout
    </button>
);
