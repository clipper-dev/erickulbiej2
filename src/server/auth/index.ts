"use server";

import { AuthError, User, UserDatabase } from "next-auth";
import { signIn } from "@/auth"; // Using the new centralized auth f
import { connectToDatabase } from "@coolbiej/core-db";
import { LoginSchema, RegisterSchema } from "./objects";
import { InsertOneResult } from "mongodb";
import { getUser } from "./user";
import { sendWelcomeEmail } from "../emails";
import { saltAndHashPassword } from "./password";

export async function getSalt(email: string): Promise<string | null> {
    const  db  = await connectToDatabase();
  const user: UserDatabase | null = (await db.collection("users").findOne({
    email,
  })) as unknown as UserDatabase;

  if (user) {
    return user.salt;
  }

  return null;
}

export async function authenticate(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  // 1. Validate the form data
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  const callbackURL = formData.get("callbackURL")?.toString() ?? "/"; // <-- Get the URL here

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      status: "error",
      payload: formData,
      callbackURL,
    };
  }

  const { email, password } = validatedFields.data;

  // 2. If validation succeeds, try to sign in
  try {
    // This will internally call the `authorize` function in your auth.ts config
    const user: User | null = await signIn("credentials", {
      email,
      password,
      redirectTo: callbackURL ?? "/", // Redirect to a protected page on success
    });
    if (!!user) {
      return { message: "Sign in successful", status: "success", callbackURL };
    } else {
      return { message: "Sign in failed", status: "error", callbackURL };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          // Return a user-friendly error message for invalid credentials
          return {
            errors: { _form: ["Invalid email or password."] },
            message: "The email or password you entered is incorrect.",
            status: "error",
            payload: formData,
            callbackURL,
          };
        default:
          // Return a generic error message for other auth errors
          return {
            errors: { _form: ["Something went wrong. Please try again."] },
            message: "An unexpected error occurred.",
            status: "error",
            payload: formData,
            callbackURL,
          };
      }
    }
    throw error;
  }
}

export async function register(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // 1. Validate the form data
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      payload: formData,
    };
  }

  const { email, password, firstName, lastName, confirmPassword } =
    validatedFields.data;

  // 2. check first if the user with this email already exists
  const response = await getUser({ email: email });

  if (response.status === "success" && response.user) {
    return {
      status: "error",
      message: "User already exists.",
      payload: formData,
    };
  }
  // user not found so continue creating the user

  // 3. check if the passwords match
  if (password !== confirmPassword) {
    return {
      status: "error",
      errors: {
        confirmPassword: ["Passwords do not match."],
      },
      message: "Validation failed. Please check the fields.",
      payload: formData,
    };
  }

  // 4. Create the user
  const { hashedPassword, salt } = await saltAndHashPassword(password);
  const newUser: Omit<UserDatabase, "_id"> = {
    email,
    passwordHash: hashedPassword,
    firstName,
    lastName,
    salt,
    role: "user",
    accountVerified: false,
    userName: firstName+lastName,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

    const  db  = await connectToDatabase();
  const userResponse: InsertOneResult<Document> = await db
    .collection("users")
    .insertOne(newUser);

  if (userResponse.acknowledged) {
    // Send a welcome email
    const response = await sendWelcomeEmail(firstName, newUser.email);
    console.log(response);
    return {
      status: "success",
      message: "You have successfully registered.",
    };
  } else {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
