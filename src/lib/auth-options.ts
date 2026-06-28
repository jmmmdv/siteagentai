import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getBusinessById } from "@/lib/businesses";
import { isDatabaseConfigured } from "@/lib/db";
import { verifyUserCredentials } from "@/lib/users";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!isDatabaseConfigured()) {
          return null;
        }

        const email = credentials?.email?.trim() ?? "";
        const password = credentials?.password ?? "";

        if (!email || !password) {
          return null;
        }

        const user = await verifyUserCredentials(email, password);
        if (!user) {
          return null;
        }

        const business = await getBusinessById(user.businessId);
        if (!business) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          businessId: business.id,
          businessName: business.name,
          widgetKey: business.widgetKey,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.businessId = user.businessId;
        token.businessName = user.businessName;
        token.widgetKey = user.widgetKey;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.businessId = token.businessId as string;
        session.user.businessName = token.businessName as string;
        session.user.widgetKey = token.widgetKey as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
