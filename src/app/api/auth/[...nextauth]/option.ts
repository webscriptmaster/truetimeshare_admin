/* eslint-disable no-param-reassign */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axiosInstance from "@/app/api/axiosInstance";
import { IUser } from "@/types/interfaces";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com"
        },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials: any) {
        try {
          const { email, password } = credentials;

          const res = await axiosInstance.post("/auth/login", {
            email,
            password
          });

          if (res.status === 200) {
            return res.data;
          }
        } catch (e) {
          throw new Error("Email or password is incorrect");
        }

        return null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.type === "credentials") {
        token.user = user.user;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as IUser;
      session.accessToken = token.accessToken as string;

      return session;
    }
  },

  debug: false
};

export default authOptions;
