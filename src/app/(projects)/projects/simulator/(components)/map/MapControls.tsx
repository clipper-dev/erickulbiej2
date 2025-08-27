"use client";

import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, LocateFixed, Lock, Unlock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
  onToggleLock: () => void;
  isLocked: boolean;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onCenter,
  onToggleLock,
  isLocked,
}: MapControlsProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="absolute top-16 left-4 z-20 flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right"><p>Zoom In</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right"><p>Zoom Out</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onCenter}>
              <LocateFixed className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right"><p>Center on Ship</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleLock}
              data-state={isLocked ? "active" : "inactive"}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{isLocked ? "Unlock Camera" : "Lock Camera to Ship"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}