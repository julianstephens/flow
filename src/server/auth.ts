import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";

import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { env } from "~/env";
import { db } from "./db";
import { newUserSchema, type NewUser } from "./db/schemas";
import { api } from "~/trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db),
    secret: env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "Password",
            credentials: {
                name: {
                    label: "Name",
                    type: "text",
                    placeholder: "John Doe",
                },
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "john.doe@coolmail.com",
                },
                password: {
                    label: "Password",
                    type: "text",
                },
            },
            authorize: async (credentials) => {
                try {
                    const user: NewUser = newUserSchema.parse({
                        ...credentials,
                    });
                    const res = await api.users.create.mutate(user);
                    return res ?? null;
                } catch (err) {
                    return null;
                }
            },
        }),
        Discord({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/",
        newUser: "/auth/register",
    },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async () =>
    await getServerSession(authOptions);
