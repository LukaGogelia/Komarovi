export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dshb-(administration|assignment|bookmarks|calendar|courses|dashboard|dictionary|forums|grades|grades-list|listing|messages|participants|quiz|reviews|settings|survey)/:path*",
  ],
};
