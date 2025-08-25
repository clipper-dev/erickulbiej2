"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { FormState, sendEmail } from "@/server/actions/email/sendEmail";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// ... other imports

const initialState: FormState = {
  status: "idle",
  message: "",
};

// A helper component for the submit button to use the useFormStatus hook
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Send className="mr-2 h-4 w-4" />
      )}
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendEmail, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        {/* ... CardHeader content ... */}
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          {/* ... Your Input and Label fields ... */}
          {/* Example for one field: */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          {/* ... other fields for lastName, email, message */}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}