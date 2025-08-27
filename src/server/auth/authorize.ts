import { Role } from "@/types/auth/User";
import { User } from "next-auth";

export async function authorizeWithRole(
  user: User | undefined,
  role: Role
): Promise<boolean> {
  if (!user) return false;
  if (user.role === role || user.role === "admin") {
    return true;
  }
  return false;
}
