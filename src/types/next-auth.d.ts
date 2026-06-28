import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      businessId: string;
      businessName: string;
      widgetKey: string;
    };
  }

  interface User {
    businessId: string;
    businessName: string;
    widgetKey: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    businessId?: string;
    businessName?: string;
    widgetKey?: string;
  }
}

export type { NextAuthOptions };
