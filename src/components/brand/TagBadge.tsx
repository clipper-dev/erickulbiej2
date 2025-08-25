import { twMerge } from "tailwind-merge";

interface TagBadgeProps {
  text: string;
  className?: string;
}

// Define the color variants we'll use.
const colorVariants = {
  default: {
    background: "bg-zinc-100",
    text: "text-zinc-800",
  },
  sky: {
    background: "bg-sky-100",
    text: "text-sky-800",
  },
  green: {
    background: "bg-emerald-100",
    text: "text-emerald-800",
  },
  amber: {
    background: "bg-amber-100",
    text: "text-amber-800",
  },
  rose: {
    background: "bg-rose-100",
    text: "text-rose-800",
  },
  indigo: {
    background: "bg-indigo-100",
    text: "text-indigo-800",
  },
} as const; // `as const` gives us stricter typing

type Variant = keyof typeof colorVariants;

// Map specific keywords to our color variants.
// Keywords are checked in lowercase to be case-insensitive.
const keywordColorMap: Record<string, Variant> = {
  nextjs: "sky",
  "next.js 15": "sky",
  typescript: "sky",
  react: "sky",
  "three.js": "indigo",
  "next-auth": "green",
  mongodb: "green",
  tailwind: "green",
  shadcn: "indigo",
  "server actions": "amber",
  "server components": "amber",
  engineering: "rose",
  simulation: "rose",
  "data visualization": "indigo",
  "e-learning": "green",
  maritime: "sky",
  ferry: "sky",
  ship: "sky",
  navigation: "sky",
  web: "amber",
  startup: "indigo",
  productivity: "green",
};

export function TagBadge({ text, className }: TagBadgeProps) {
  // Find the color variant for the current tag, or use 'default'.
  const variant = keywordColorMap[text.toLowerCase()] || "default";
  const styles = colorVariants[variant];

  return (
    <span
      className={twMerge(
        "inline-block text-xs font-medium px-2.5 py-1 rounded-full",
        styles.background,
        styles.text,
        className
      )}
    >
      {text}
    </span>
  );
}
