import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/data/mongoDb/utils/database";
import Person from "@/data/mongoDb/models/person";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await dbConnect();
          const user = await Person.findOne({ email });
          console.log(user);
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.user.password);

          if (!passwordsMatch) {
            return null;
          }

          return { name: user._id, email: user.roles };
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
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: { username: {}, password: {} },
//       async authorize(credentials) {
//         try {
//           const { identifier, password } = credentials;
//           await dbConnect();

//           const userG = await Person.findOne({
//             $or: [
//               { email: identifier },
//               { phone: identifier },
//               { nationalId: identifier }
//             ]
//           });

//           if (!userG) {
//             console.error("User not found:", identifier);
//             return null;
//           }

//           const userPassword = userG.user ? userG.user.password : undefined;
//           if (!userPassword) {
//             console.error("Password not found for:", identifier);
//             return null;
//           }

//           const passwordsMatch = await bcrypt.compare(password, userPassword);

//           if (!passwordsMatch) {
//             console.error("Passwords do not match for:", identifier);
//             return null;
//           }

//           const user = { name: "Lasha", email: "lashavrda@gmail.com", image: "https://www.myip.com/img/myip.png" };

//           return user;

//         } catch (error) {
//           console.error("Authorization error:", error);
//           return null;
//         }
//       }
//     }),
//   ],

//   jwt: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt(token, user) {
//       if (user) {
//         token._id = user._id;
//       }
//       return token;
//     },


//     async session(session, token) {
//       if (token?._id) {
//         session.user = { _id: token._id };
//       }
//       return session;
//     }

//   },



//   secret: process.env.NEXTAUTH_SECRET,

//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
