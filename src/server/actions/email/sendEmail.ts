"use server";

import { z } from "zod";
import { Resend } from "resend";

// You can create a simple React component for your email template
// import { ContactFormEmail } from "@/components/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid form data. Please check your entries.",
    };
  }
  
  const { firstName, email, message } = validatedFields.data;

  try {
    const { error } = await resend.emails.send({
      from: "Contact Form <contact@erickulbiej.com>", // Must be a verified domain in Resend
      to: ["your-personal-email@example.com"], // Your personal email
      subject: `New message from ${firstName} via your website`,
      replyTo: email,
      // You can use plain text or a React component
      text: `From: ${firstName} <${email}>\n\nMessage:\n${message}`,
      // react: ContactFormEmail({ firstName, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { status: "error", message: "Failed to send message." };
    }

    return { status: "success", message: "Message sent successfully!" };
  } catch (e) {
    console.error(e);
    return { status: "error", message: "An unexpected error occurred." };
  }
}