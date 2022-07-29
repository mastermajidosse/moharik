import nextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export default nextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // OAuth authentication providers
    FacebookProvider({
      clientId: process.env.APPLE_ID || "5304193779669835",
      clientSecret:
        process.env.APPLE_SECRET || "b0b2e494c6a867f1380fa42310750737",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
