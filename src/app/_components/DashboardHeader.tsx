"use client";

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import type { SessionWrapper } from "~/types";

export const DashboardHeader = ({ pageTitle }: { pageTitle?: string }) => {
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");

    useEffect(() => {
        getSession().then((session): void => {
            const username = (
                session as unknown as SessionWrapper
            )?.session?.user?.name?.split(" ")[0];
            const profileImg = (session as unknown as SessionWrapper)?.session
                ?.user?.image;

            if (username) setName(username);
            if (profileImg) setProfile(profileImg);
        });
    }, []);

    return (
        <div className="flex w-full justify-between">
            <h3>{pageTitle ?? `Welcome back${name ? `, ${name}` : ""}!`}</h3>
            <button
                className="circle bg-grey"
                style={{
                    background: `${profile ? `url(${profile})` : "#898f9f"}`,
                    backgroundSize: "cover",
                }}
            />
        </div>
    );
};
