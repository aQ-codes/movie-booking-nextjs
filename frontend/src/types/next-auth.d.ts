import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;  // Add the 'id' field here
    } & DefaultSession["user"];  // Extend the default user fields (name, email, image)
  }
}
