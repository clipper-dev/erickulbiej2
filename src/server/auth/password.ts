"use server";

import bcryptjs from "bcryptjs";

export async function generatePasswordResetToken() {
  const token = crypto.randomUUID().toString();
  return token;
}

export async function generateSalt() {
  const salt = await bcryptjs.genSalt(10);
  return salt;
}

export async function saltAndHashPassword(password: string, salt?: string) {
  if (!salt) {
    salt = await generateSalt();
  }
  const pepperedPassword =
    password.toString() + (process.env.SOLNICZKA?.toString() ?? "aaa");

  const hashedPassword = await bcryptjs.hash(pepperedPassword, salt);
  return {hashedPassword, salt};
}
