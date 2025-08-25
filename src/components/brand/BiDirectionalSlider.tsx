"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

// We re-create the shadcn/ui Slider here to customize the track
const BiDirectionalSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const isVertical = props.orientation === "vertical";

  // Gradient for the track. Emerald = positive, Rose = negative.
  const trackGradient = isVertical
    ? "bg-gradient-to-t from-rose-500 via-zinc-300 to-emerald-500"
    : "bg-gradient-to-r from-rose-500 via-zinc-300 to-emerald-500";

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex touch-none select-none",
        isVertical ? "h-full w-fit items-center" : "w-full items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-secondary",
          isVertical ? "h-full w-2" : "h-2 w-full",
          trackGradient // Apply our custom gradient
        )}
      >
        {/* The original <Range> is not needed for this visual style */}
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});

BiDirectionalSlider.displayName = SliderPrimitive.Root.displayName;

export { BiDirectionalSlider };
