import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { env } from "~/env";
import { db } from "~/server/db";
import { type User as $User, type UserLevel } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: $User["id"];
      name: $User["name"];
      username: $User["username"];
      level: UserLevel;
      // ...other properties
      // role: UserRole;
    };
  }

  interface User {
    id: $User["id"];
    level: UserLevel;
    username: $User["username"];
  }
}

const adapter = PrismaAdapter(db) as Adapter;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        level: user.level,
        username: user.username,
        name: user.name,
      },
    }),
  },
  jwt: {
    async encode({ secret, token, maxAge }) {
      const newToken = jwt.sign(token as object, secret, { 
        algorithm: "HS256",
        expiresIn: maxAge,
      });

      let session;
      if (token != null && typeof token.sub == "string" && adapter.createSession != undefined) {
        session = await adapter.createSession({
          userId: token.sub,
          sessionToken: newToken,
          expires: new Date(new Date().getTime() + ((maxAge ?? 0) * 1000)),
        });
      }

      return newToken;
    },
  },
  adapter,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", },
        password: { label: "Password", type: "password", },
      },
      async authorize(credentials, req) {
        const user = await db.user.findFirst({
          where: {
            username: credentials!.username,
          },
        });

        if (!user) return null;
        if (! await bcrypt.compare(credentials!.password, user.password) ) return null;

        return {
          id: user.id,
          level: user.level,
          username: user.username,
          name: user.name,
        };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
