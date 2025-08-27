"use client";

import { Button } from "@/components/ui/button";
import {
  Play, Pause,
  ChevronsDown, ChevronsUp, TimerReset
} from "lucide-react";
import { SettingsDropdown } from "../SettingsDropdown";

interface TopToolbarProps {
  isPaused: boolean;
  timeScale: number;
  elapsedTime: number;
  onTogglePlayPause: () => void;
  onTimeSlower: () => void;
  onTimeReset: () => void;
  onTimeFaster: () => void;
  onStop: () => void;
  onOpenSettings: () => void;
  onRestart: () => void;
}

// Helper to format the time scale, showing fractions for speeds less than 1x.
function formatTimeScale(scale: number): string {
  if (scale >= 1) {
    return `${scale}x`;
  }
  return `1/${1 / scale}x`;
}

// Helper to format seconds into MM:SS format
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function TopToolbar({
  isPaused,
  timeScale,
  elapsedTime,
  onTogglePlayPause,
  onTimeSlower,
  onTimeReset,
  onTimeFaster,
  onOpenSettings,
  onRestart,
}: TopToolbarProps) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
      <div className="flex h-11 items-center gap-1 bg-background p-1.5 rounded-lg shadow-md border">
        {/* Playback Controls */}
        <Button variant="ghost" size="icon" onClick={onTogglePlayPause}>
          {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </Button>
       {/*  <Button variant="ghost" size="icon" onClick={onStop}>
          <StopCircle className="h-5 w-5" />
        </Button> */}

        <div className="h-full w-[1px] bg-border mx-2" />

        {/* Time Scale Controls */}
        <Button variant="ghost" size="icon" onClick={onTimeSlower}>
          <ChevronsDown className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onTimeReset} className="w-12">
          <TimerReset className="h-4 w-4 mr-1" />
          <span className="font-mono text-xs">{formatTimeScale(timeScale)}</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onTimeFaster}>
          <ChevronsUp className="h-5 w-5" />
        </Button>
        
        <div className="h-full w-[1px] bg-border mx-2" />
        
        {/* Elapsed Time Display */}
        <div className="font-mono text-sm px-2 w-20 text-center text-muted-foreground">
          {formatTime(elapsedTime)}
        </div>
        
        {/* Settings and Actions */}
        <SettingsDropdown onOpenSettings={onOpenSettings} onRestart={onRestart} />
      </div>
    </div>
  );
}