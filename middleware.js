import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "ge"];
const publicPages = ["/", "/login"];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req) {
  const publicPathnameRegex = RegExp(
    `^(?!/dashboard|/dshb-(administration|assignment|bookmarks|calendar|courses|dashboard|dictionary|forums|grades|grades-list|listing|messages|participants|quiz|reviews|settings|survey)).*$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};