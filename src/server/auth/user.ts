"use server";
import { auth } from "@/auth";
import { connectToDatabase } from "@coolbiej/core-db";
import { ObjectId, UpdateResult } from "mongodb";
import { User, UserDatabase } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getServerUser(email: string): Promise<{
  user: User | null;
  status: "success" | "error";
  message: string;
  errors?: { [key: string]: string[] | undefined };
}> {
    const  db  = await connectToDatabase();
  const user: UserDatabase | null = (await db.collection("users").findOne({
    email,
  })) as unknown as UserDatabase;

  if (!user) {
    return {
      user: null,
      status: "error",
      message: "User not found.",
      errors: {
        email: ["User not found."],
      },
    };
  } else
    return {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      } as User,
      status: "success",
      message: "User found.",
    };
}

export async function getUser(query: {
  [key: string]: string | undefined;
}): Promise<{
  user: User | null;
  status: "success" | "error";
  message: string;
  errors?: { [key: string]: string[] | undefined };
}> {
    const  db  = await connectToDatabase();
  const user: User | null = (await db.collection("users").findOne({
    ...query,
  })) as unknown as User;

  if (user) {
    return {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        passwordResetExpires: user.passwordResetExpires,
        passwordResetToken: user.passwordResetToken,
        role: user.role,
        accountVerified: user.accountVerified,
      } as User,
      status: "success",
      message: "User found.",
    };
  } else {
    return {
      user: null,
      status: "error",
      errors: {
        email: ["User not found."],
      },
      message: "User not found.",
    };
  }
}

export async function updateUser(
  user: User,
  data: Partial<User | UserDatabase>
): Promise<{
  user: User | null;
  status: "success" | "error";
  message: string;
  errors?: { [key: string]: string[] | undefined };
  payload?: FormData;
}> {
    const  db  = await connectToDatabase();
  const userResponse: UpdateResult<Document> = await db
    .collection("users")
    .updateOne(
      {
        _id: new ObjectId(user._id),
      },
      {
        $set: data,
      }
    );

  if (userResponse.acknowledged) {
    return {
      user: {
        ...user,
        ...data,
      } as User,
      status: "success",
      message: "User updated.",
    };
  } else {
    return {
      user: null,
      status: "error",
      errors: {
        email: ["User not found."],
      },
      message: "User not found.",
    };
  }
}

export async function updateUserFromClient(
  payload: Partial<UserDatabase>,
  userId: string
): Promise<{
  status: "success" | "error";
  message: string;
  errors?: { [key: string]: string[] | undefined };
}> {
  const session = await auth();
  if (!session)
    return {
      status: "error",
      message: "You must be logged in to update your profile.",
    };
  if (session.user?._id === userId) {
    const  db  = await connectToDatabase();
    const userResponse: UpdateResult<Document> = await db
      .collection("users")
      .updateOne(
        {
          _id: new ObjectId(userId),
        },
        {
          $set: payload,
        }
      );

    if (userResponse.acknowledged) {
      console.log("User updated.");
      revalidatePath("/");
      revalidatePath("/profile");
      return {
        status: "success",
        message: "User updated.",
      };
    } else {
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }
  }
  return {
    status: "error",
    message: "Wrong user id.",
  };
}
