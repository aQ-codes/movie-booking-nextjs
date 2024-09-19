import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

export default NextAuth({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("signIn user:", user);
      console.log("signIn account:", account);
      console.log("signIn profile:", profile);
      return true;
    },
    async session({ session, token }) {
      console.log("session:", session);
      console.log("token:", token);
      // Ensure that session.user is defined before assigning properties to it
      if (session.user) {
      // Assign the user's ID to the session, providing a fallback to an empty string
        session.user.id = token.sub || "";  // Fallback if token.sub is undefined
      }
      return session;
    },
  },
});
