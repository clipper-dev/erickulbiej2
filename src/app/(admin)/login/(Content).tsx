"use client";
import { TypographyH1, TypographySmall } from "@/components/coolbiej";
import { ButtonLoading, InputWithErrors } from "@/components/shadcnPlus";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/server/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function Content() {
  const initialState: LoginState = {
    message: null,
    errors: {},
    status: "idle",
    callbackURL: "/",
  };
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState
  );

  useEffect(() => {
    if (state.status === "success") {
      setTimeout(() => {
        toast.success(state.message);
      }, 500);
    }
  }, [state.message, state.status]);

  //HANDLE CALLBACK URL
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") ?? "/";

  return (
      <form className="flex flex-col gap-4 w-72 m-auto rounded-lg" action={formAction}>
        <TypographyH1>SIGN <span className="text-solas">IN</span></TypographyH1>
        <input type="hidden" name="callbackURL" value={callbackURL} />
        <InputWithErrors
          type="text"
          name="email"
          placeholder="email"
          aria-label="email"
          errors={state.errors?.email}
          required
          autoComplete="email"
          aria-invalid={state.errors?.email ? "true" : "false"}
          defaultValue={(state.payload?.get("email") || "") as string}
        />
        <InputWithErrors
          type="password"
          name="password"
          placeholder="password"
          aria-label="password"
          errors={state.errors?.password}
          required
          autoComplete="new-password"
          aria-invalid={state.errors?.password ? "true" : "false"}
          defaultValue={(state.payload?.get("password") || "") as string}
        />
        <Label className="ml-2">
          <Link
            href="/reset-password"
            className="underline hover:text-solas"
          >
            Forgot password?
          </Link>
        </Label>
        <ButtonLoading
          type="submit"
          className="w-full"
          isPending={isPending}
          pendingText="Logging In..."
        >
          Login
        </ButtonLoading>
        {state.status === "error" && (
          <TypographySmall className="text-red-500 ml-2">
            {state.message}
          </TypographySmall>
        )}
        <Label className="ml-2">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline hover:text-solas">
            Register
          </a>
        </Label>
      </form>
  );
}
