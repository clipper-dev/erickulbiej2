import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import { LuLoaderCircle } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";

// SHADCN EXTENSIONS

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPending?: boolean;
  pendingText?: string;
}
const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      className,
      variant,
      size,
      children, // Use `children` for the default content
      isPending = false, // Default to false
      pendingText = "Loading...", // Provide a default loading text
      ...props // Collect all other props (like `onClick`, `type`, etc.)
    },
    ref
  ) => {
    // 3. The button should be disabled if it's pending OR if it was already disabled via props.
    const disabled = isPending || props.disabled;

    return (
      <Button
        className={cn(className)} // Use `cn` for better class merging
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled}
        {...props} // Pass down all remaining props
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <LuLoaderCircle className="animate-spin" />
            {pendingText}
          </span>
        ) : (
          children // Render the children when not pending
        )}
      </Button>
    );
  }
);

ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };

interface InputWithErrorsProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
}

export function InputWithErrors({ errors, ...props }: InputWithErrorsProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <Input {...props} />
      {!!errors &&
        errors.map((error: string) => (
          <p className="ml-2 text-sm text-destructive" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}

export function InputWithIcon({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative flex flex-row gap-2 items-center">
      <input
        type={type}
        data-slot="input"
        className={cn(
          " file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pr-8",
          className
        )}
        {...props}
      />
      <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export { Input }