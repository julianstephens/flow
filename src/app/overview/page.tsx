"use client";
import type { User } from "next-auth";
import { useEffect, useState } from "react";
import { FaColumns, FaPiggyBank } from "react-icons/fa";
import { getSession } from "~/utils/queries";
import { LogoutButton } from "../_components/authButtons";

const OverviewDashboard = () => {
    const [session, setSession] = useState<User>();

    useEffect(() => {
        getSession().then((data) => {
            if (data?.session?.user) setSession(data.session.user);
        });
    }, []);

    return (
        <div className="h-100 w-100 row">
            <div className="sidebar col h-100 w-25 py-lg ps-2xl d-flex flex-column justify-content-between border-end">
                <div>
                    <p className="font-sm font-logo">flow</p>
                    <nav className="module-nav font-xs mt-3xl">
                        <ul className="d-flex flex-column p-0">
                            <li>
                                <a className="d-flex align-items-center">
                                    <span>
                                        <FaColumns />
                                    </span>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a className="d-flex align-items-center">
                                    <span>
                                        <FaPiggyBank />
                                    </span>
                                    Budgets
                                </a>
                            </li>
                            <li>
                                <a className="d-flex align-items-center">
                                    <span>
                                        <FaPiggyBank />
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <LogoutButton />
            </div>

            <div className="col h-100 pt-lg d-flex flex-column w-auto">
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h3>Welcome back, {session?.name ?? "Shinji"}</h3>
                    <div className="circle bg-blue" />
                </div>
            </div>
        </div>
    );
};

export default OverviewDashboard;
