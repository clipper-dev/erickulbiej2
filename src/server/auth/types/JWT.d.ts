import { type JWT as OriginalJWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  
    export interface JWT extends OriginalJWT {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: "admin" | "user";
    accountVerified: boolean;
  }
}
