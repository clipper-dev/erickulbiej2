import z from "zod";

// Create a Zod schema for validation
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const UpdatePasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirmation password is required." }),
  token: z.string().min(1, { message: "Token is required." }),
}).refine((data) => data.password === data.confirmPassword, {
  // If the validation fails, this message is used
  message: "Passwords do not match.",
  // This is crucial: it attaches the error to the `confirmPassword` field
  path: ["confirmPassword"],
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
    firstName: z.string().min(1, { message: "First name is required." }), // More user-friendly message
    lastName: z.string().min(1, { message: "Last name is required." }), // More user-friendly message
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmation password is required." }),
  })
  // .refine() is a super-validator that runs after all individual fields are valid
  .refine((data) => data.password === data.confirmPassword, {
    // If the validation fails, this message is used
    message: "Passwords do not match.",
    // This is crucial: it attaches the error to the `confirmPassword` field
    path: ["confirmPassword"],
  });
