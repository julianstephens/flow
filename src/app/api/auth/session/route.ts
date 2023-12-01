import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "~/server/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        authenticated: !!session,
        session,
    });
};
