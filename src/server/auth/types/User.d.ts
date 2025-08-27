import { type User as OriginalUser } from "next-auth";

declare module "next-auth" {
  interface User extends OriginalUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;  
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | null;
    accountVerified: boolean;
    createdAt: Date;
    updatedAt: Date;

    //profile data
    userName: string;
  }

  export interface UserDatabase extends User {
    passwordHash: string;
    salt: string;
  }
}

export type FieldsPermittedForUpdate =
  | "firstName"
  | "lastName"
  | "email"
  | "userName"

  export type Role = "admin" | "user";