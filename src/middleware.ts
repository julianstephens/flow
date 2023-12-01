import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import type { SessionWrapper } from "./types";

export const middleware = async (req: NextRequest) => {
    const openPaths = ["/auth/login", "/auth/register", "/"];

    const session = await getSession();
    const isAuthed =
        (session as unknown as SessionWrapper)?.authenticated ?? false;

    if (openPaths.indexOf(req.nextUrl.pathname) > 0 && isAuthed)
        return NextResponse.redirect(`${req.nextUrl.origin}/overview`);

    if (openPaths.indexOf(req.nextUrl.pathname) < 0 && !isAuthed)
        return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);

    return NextResponse.next();
};

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
