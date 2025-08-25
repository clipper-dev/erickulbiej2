import { Button } from "@/components/ui/button";
import { Play, Pause, FastForward, Rewind, StopCircle } from "lucide-react";

export function TopToolbar() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center gap-2 bg-background p-2 rounded-lg shadow-md border">
        <Button variant="ghost" size="icon">
          <Rewind className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Pause className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <StopCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Play className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <FastForward className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}