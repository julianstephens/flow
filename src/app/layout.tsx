import "~/styles/globals.css";

import { Montserrat, Montserrat_Alternates, PT_Sans } from "next/font/google";
import { cookies } from "next/headers";

import type React from "react";
import { Toaster } from "react-hot-toast";
import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";
import { AuthProvider } from "./_components/auth/AuthProvider";

const ptSans = PT_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-pt",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-monts",
});

const montsAlt = Montserrat_Alternates({
    weight: ["400", "600"],
    subsets: ["latin"],
    variable: "--font-monts-alt",
});

export const metadata = {
    title: env.NEXT_PUBLIC_APP_NAME,
    description: "A modern budget tracking solution",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`font-sans ${ptSans.variable} ${montsAlt.variable} ${montserrat.variable}`}
            >
                <TRPCReactProvider cookies={cookies().toString()}>
                    <Toaster />
                    <AuthProvider>{children}</AuthProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
