import { cn } from "@/lib/utils";
import React from "react";
import { LuLoaderCircle } from "react-icons/lu";
interface PageProps {
  children: React.ReactNode;
  args?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
}

// --- GENERAL COMPONENTS ---

export function Page({ children, args, className }: PageProps) {
  return (
    <div
      {...args}
      className={cn(
        "flex flex-col gap-4 w-full min-h-[calc(100vh-16rem)] max-w-screen-xl mx-auto md:px-16 px-4",
        className
      )}
    >
      {children}
    </div>
  );
}

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto w-full max-w-screen-xl px-6 md:px-8 mt-16",
      className
    )}
    {...props}
  />
));
Container.displayName = "Container";

export { Container };

// --- LOADERS AND SKELETONS ---

export function Loader() {
  return (
    <LuLoaderCircle className="animate-spin m-auto text-foreground text-2xl" />
  );
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

// --- HEADING COMPONENTS ---

export function TypographyH1({ children, className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight text-balance",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "mt-8 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "mt-4 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

// --- PARAGRAPH & TEXT COMPONENTS ---

export function TypographyP({ children, className, ...props }: ParagraphProps) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyLead({
  children,
  className,
  ...props
}: ParagraphProps) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function TypographySmall({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyWeak({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </small>
  );
}

// badge

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}

export function Badge({
  children,
  variant = "primary",
  className,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-semibold leading-none",
        {
          "bg-orange-100 text-orange-600 border-orange-200": variant === "primary",
          "bg-secondary-foreground text-secondary-foreground":
            variant === "secondary",
          "bg-tertiary-foreground text-tertiary-foreground":
            variant === "tertiary",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}


interface QuarterRingLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tailwind color class for the two filled, spinning quarters. e.g., 'border-primary' */
  fillColor?: string;
  /** Tailwind color class for the static background ring. e.g., 'border-muted' */
  trackColor?: string;
  /** The thickness of the spinning ring. e.g., 'border-4' */
  thickness?: string;
}

const QuarterRingLoader = React.forwardRef<HTMLDivElement, QuarterRingLoaderProps>(
  (
    {
      className,
      fillColor = "border-white",
      trackColor = "border-black",
      thickness = "border-6",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative h-8 w-8", className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        <span className="sr-only">Loading...</span>

        {/* Static background track */}
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            trackColor,
            thickness
          )}
        />
        
        {/* Spinning filled quarters */}
        <div
          className={cn(
            "absolute inset-0 animate-spin rounded-full border-transparent",
            fillColor,
            thickness,
            // This is the trick: we only color the top and bottom borders.
            // When combined with rounded-full, they appear as diagonal quarters.
            `border-t-solas border-b-solas`
          )}
        />
      </div>
    );
  }
);
QuarterRingLoader.displayName = "QuarterRingLoader";

export { QuarterRingLoader };