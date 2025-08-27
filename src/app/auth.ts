import NextAuth, { User, UserDatabase } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/server/auth/db";
import { saltAndHashPassword } from "@/server/auth/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const db = await connectToDatabase();

          const user: UserDatabase | null = (await db
            .collection("users")
            .findOne({
              email,
            })) as unknown as UserDatabase;

          if (!user) {
            throw new Error("No user found with this email.");
          }

          const { hashedPassword } = await saltAndHashPassword(
            password,
            user.salt
          );

          if (hashedPassword !== user.passwordHash) {
            throw new Error("Invalid credentials.");
          }
          //update user properties in case of updates
          let needUpdate = false;
          if (
            user.accountVerified === null ||
            user.accountVerified === undefined
          ) {
            needUpdate = true;
            user.accountVerified = false;
          }
          if (user.role === null || user.role === undefined) {
            needUpdate = true;
            user.role = "user";
          }
          if (user.userName === null || user.userName === undefined) {
            needUpdate = true;
            user.userName = user.firstName + user.lastName;
          }
          if (needUpdate) {
            await db.collection("users").updateOne(
              {
                _id: new ObjectId(user._id),
              },
              {
                $set: {
                  accountVerified: user.accountVerified,
                  role: user.role,
                },
              }
            );
          }

          console.log(user);

          const authUser: User = {
            _id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            role: user.role,
            accountVerified: user.accountVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };

          return {
            ...authUser,
          } as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.accountVerified = user.accountVerified;
      } else {
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as "admin" | "user";
        session.user.accountVerified = token.accountVerified as boolean;
      }
      return session;
    },
  },
});
