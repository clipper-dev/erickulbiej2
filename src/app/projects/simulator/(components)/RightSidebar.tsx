"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// A reusable component for displaying labeled data
function ParameterDisplay({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit: string;
}) {
  return (
    <div className="flex justify-between items-baseline text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold">
        {value} <span className="text-xs text-muted-foreground">{unit}</span>
      </span>
    </div>
  );
}

export function RightSidebar() {
  // Example states for sliders
  const [bowThruster, setBowThruster] = useState(0);
  const [portEngine, setPortEngine] = useState(50);
  const [stbdEngine, setStbdEngine] = useState(50);

  return (
    <aside className="w-80 h-full bg-background border-l flex-shrink-0 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Motion Parameters */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Motion Parameters</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <ParameterDisplay label="Heading" value={123.4} unit="°" />
            <ParameterDisplay label="Speed Lon." value={12.5} unit="kts" />
            <ParameterDisplay label="Speed Lat." value={0.2} unit="kts" />
            <ParameterDisplay label="Rate of Turn" value={-1.5} unit="°/min" />
          </CardContent>
        </Card>

        {/* Environmental Data */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Environment</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <ParameterDisplay label="Wind Speed" value={15} unit="kts" />
            <ParameterDisplay label="Wind From" value={270} unit="°" />
            <Separator />
            <ParameterDisplay label="Tide Speed" value={1.5} unit="kts" />
            <ParameterDisplay label="Tide From" value={180} unit="°" />
            <Separator />
            <ParameterDisplay label="Wave Height" value={2.0} unit="m" />
            <ParameterDisplay label="Wave From" value={225} unit="°" />
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Controls</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-6">
            {/* Bow Thruster */}
            <div className="space-y-2">
              <Label htmlFor="bow-thruster">Bow Thruster</Label>
              <Slider
                id="bow-thruster"
                min={-100}
                max={100}
                step={10}
                value={[bowThruster]}
                onValueChange={(val) => setBowThruster(val[0])}
              />
            </div>
            {/* Engines */}
            <div className="flex justify-around items-center h-40">
              <div className="flex flex-col items-center space-y-2 h-full">
                <Label htmlFor="port-engine">Port</Label>
                <Slider
                  id="port-engine"
                  orientation="vertical"
                  min={0}
                  max={100}
                  value={[portEngine]}
                  onValueChange={(val) => setPortEngine(val[0])}
                  className="h-full"
                />
              </div>
              <div className="flex flex-col items-center space-y-2 h-full">
                <Label htmlFor="stbd-engine">Stbd</Label>
                <Slider
                  id="stbd-engine"
                  orientation="vertical"
                  min={0}
                  max={100}
                  value={[stbdEngine]}
                  onValueChange={(val) => setStbdEngine(val[0])}
                  className="h-full"
                />
              </div>
            </div>
            {/* Rudders */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="port-rudder">Port Rudder</Label>
                <Slider id="port-rudder" defaultValue={[0]} min={-35} max={35} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stbd-rudder">Stbd Rudder</Label>
                <Slider id="stbd-rudder" defaultValue={[0]} min={-35} max={35} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}