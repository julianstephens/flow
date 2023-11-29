export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/((?!api|overview|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)",
    ],
};
