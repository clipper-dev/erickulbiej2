import { type DefaultSession } from "next-auth"
 
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role?: "admin" | "user";
      accountVerified: boolean;
    } & DefaultSession["user"] 
  }
}