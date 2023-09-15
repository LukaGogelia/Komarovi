import dbConnect from "@/data/mongoDb/database";
import { User } from "@/data/mongoDb/models";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { identifier, password } = credentials;

        try {
          await dbConnect();
          const user = await User.findOne({ email: identifier });

          console.log(user);
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.passwordHashed
          );

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
