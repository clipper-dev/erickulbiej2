"use server";

import { ResetPasswordSchema, UpdatePasswordSchema } from "./objects";
import { getUser, updateUser } from "./user";
import { sendPasswordResetEmail } from "../emails";
import { settings } from "@/data/settings";
import { generatePasswordResetToken, saltAndHashPassword } from "./password";

export async function resetPassword(
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  // 1. Validate the form data
  const validatedFields = ResetPasswordSchema.safeParse(
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

  const { email } = validatedFields.data;

  try {
    // get user by email
    const response = await getUser({ email });

    if (!response.user) {
      return {
        errors: {
          email: ["User not found."],
        },
        message: "User not found.",
        status: "error",
        payload: formData,
        callbackURL,
      };
    }

    // generate a new password reset token
    const passwordResetToken = await generatePasswordResetToken();

    // update the user's password reset token
    const updateResponse = await updateUser(response.user, {
      passwordResetToken,
      passwordResetExpires: new Date(
        new Date().getTime() + settings.timers.resetPasswordTokenExpiration
      ),
    });

    if (updateResponse.status === "error") {
      return {
        errors: {
          email: ["User not found."],
        },
        message: "User not found.",
        status: "error",
        payload: formData,
        callbackURL,
      };
    }

    // send the password reset email
    const emailSendResponse = await sendPasswordResetEmail(
      response.user.email,
      response.user.firstName,
      passwordResetToken
    );

    console.log(emailSendResponse);

    return {
      message: "Password reset email sent.",
      status: "success",
      payload: formData,
      callbackURL,
    };
  } catch (error) {
    console.log(error);
    return {
      errors: {
        email: ["User not found."],
      },
      message: "User not found.",
      status: "error",
      payload: formData,
      callbackURL,
    };
  }
}

export async function updatePassword(
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const validatedFields = UpdatePasswordSchema.safeParse(
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

  const { email, password, token } = validatedFields.data;

  // fetch the user by email
  const response = await getUser({ email });

  if (!response.user) {
    return {
      errors: {
        email: ["There is no user with this email."],
      },
      message: "User not found.",
      status: "error",
      payload: formData,
      callbackURL,
    };
  }
  //check if the token is valid
  console.log("client token",response.user.passwordResetToken);
  console.log("db token",token);
  if (response.user.passwordResetToken !== token) {
    return {
      errors: {
        token: ["Invalid reset password token."],
      },
      message: "Invalid token.",
      status: "error",
      payload: formData,
      callbackURL,
    };
  }
  // check if the token has expired
  const isTokenExpired =
    new Date(response.user.passwordResetExpires ?? new Date()) < new Date();

  if (isTokenExpired) {
    return {
      errors: {
        token: ["Reset password token has expired."],
      },
      message: "Token has expired.",
      status: "error",
      payload: formData,
      callbackURL,
    };
  }

  const { hashedPassword, salt } = await saltAndHashPassword(password);

  const updateResponse = await updateUser(response.user, {
    passwordHash: hashedPassword,
    salt: salt,
    passwordResetToken: null,
    passwordResetExpires: null,
  });

  if (updateResponse.status === "error") {
    return {
      errors: {
        email: ["An error occurred, please try again."],
      },
      message: "User not found.",
      status: "error",
      payload: formData,
      callbackURL,
    };
  } else {
    return {
      message: "Password updated.",
      status: "success",
      payload: formData,
      callbackURL,
    };
  }
}
