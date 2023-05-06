//libraries
import { NextAuthOptions } from "next-auth";

import NextAuth from "next-auth/next";
//prisma
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
//providers
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
//others
// import { getUserByEmail } from "prisma/user";
// import { verifyPassword } from "../../../utils/index";

// const prisma = new PrismaClient();

type Input = {
  email: string;
  password: string;
};

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Input;

        // const user = await getUserByEmail(email);
        const user = false; //todo remove this

        if (!user) return null;

        // const isPWValid = await verifyPassword(password, user.password!);

        // if (!isPWValid) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.NEXT_AUTH_FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.NEXT_AUTH_FACEBOOK_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.NEXT_AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: process.env.NEXT_AUTH_GITHUB_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
    jwt: true,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(
        "🚀 ~ file: [...nextauth].ts:64 ~ signIn ~ credentials:",
        credentials
      );
      console.log("🚀 ~ file: [...nextauth].ts:64 ~ signIn ~ email:", email);
      console.log(
        "🚀 ~ file: [...nextauth].ts:64 ~ signIn ~ profile:",
        profile
      );
      console.log(
        "🚀 ~ file: [...nextauth].ts:64 ~ signIn ~ account:",
        account
      );
      console.log("🚀 ~ file: [...nextauth].ts:64 ~ signIn ~ user:", user);

      return true;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
} as NextAuthOptions;

export default NextAuth(authOptions);
