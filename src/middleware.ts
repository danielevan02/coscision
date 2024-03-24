import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const sessionToken = req.cookies.get("next-auth.session-token") ?? req.cookies.get("__Secure-next-auth.session-token");
      if (sessionToken) return true;
      else return false;
    },
  },
  pages: {
    signIn: '/login'
  }
});

export const config = { matcher: ["/", "/kostum/:path*", "/kriteria/:path*", "/nilai/:path*", "/hasil/", "/metode/", "/about/"] };