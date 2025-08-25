"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// ... other imports ...
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Collapsible } from "@/components/ui/collapsible";
import { BiDirectionalSlider } from "@/components/brand/BiDirectionalSlider";
import { Button } from "@/components/ui/button";
import { PanelTopOpen } from "lucide-react";

// --- HELPERS (unchanged) ---
const radToDeg = (rad: number) => rad * (180 / Math.PI);
const mpsToKnots = (mps: number) => mps * 1.94384;
const radPerSecToDegPerMin = (radPerSec: number) =>
  radPerSec * (180 / Math.PI) * 60;

// --- PROPS DEFINITION ---
interface RightSidebarProps {
  motion: MotionState;
  controls: ControlState;
  onControlChange: (key: keyof ControlState, value: number) => void;
  onOpenDashboard: () => void;
}

// ... ParameterDisplay component is unchanged ...
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

export function RightSidebar({
  motion,
  controls,
  onControlChange,
  onOpenDashboard,
}: RightSidebarProps) {
  // NO MORE LOCAL STATE HERE!
  return (
    <aside className="w-80 h-full bg-background border-l flex-shrink-0 overflow-y-auto">
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Button
              className="w-full"
              variant="outline"
              onClick={onOpenDashboard}
            >
              <PanelTopOpen className="mr-2 h-4 w-4" />
              Open Parameters Window
            </Button>
          </CardContent>
        </Card>
        {/* Motion Parameters Card (now reads from props) */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Motion Parameters</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <ParameterDisplay
              label="Position LAT"
              value={motion.position.north.toFixed(1)}
              unit="m"
            />
            <ParameterDisplay
              label="Position LON"
              value={motion.position.east.toFixed(1)}
              unit="m"
            />
            <Separator />
            <ParameterDisplay
              label="Heading"
              value={radToDeg(motion.position.heading).toFixed(1)}
              unit="°"
            />
            <ParameterDisplay
              label="Speed Lon."
              value={mpsToKnots(motion.velocity.surge).toFixed(1)}
              unit="kts"
            />
            <ParameterDisplay
              label="Speed Lat."
              value={mpsToKnots(motion.velocity.sway).toFixed(1)}
              unit="kts"
            />
            <ParameterDisplay
              label="Rate of Turn"
              value={radPerSecToDegPerMin(motion.velocity.yaw).toFixed(1)}
              unit="°/min"
            />
          </CardContent>
        </Card>

        {/* Environment Card (unchanged) */}
        <Collapsible defaultOpen>{/* ... */}</Collapsible>

        {/* Controls Card (now reads `controls` from props and calls `onControlChange`) */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Controls</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-8">
            <div className="space-y-3">
              <Label htmlFor="bow-thruster" className="flex justify-between">
                <span>Bow Thruster</span>
                <span className="font-mono">{controls.bowThruster}%</span>
              </Label>
              <BiDirectionalSlider
                id="bow-thruster"
                min={-100}
                max={100}
                step={10}
                value={[controls.bowThruster]}
                onValueChange={(val) => onControlChange("bowThruster", val[0])}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div className="flex flex-col items-center space-y-3 h-48">
                <Label htmlFor="port-engine" className="text-center">
                  Port Engine{" "}
                  <span className="block font-mono mt-1">
                    {controls.portEngine}%
                  </span>
                </Label>
                <BiDirectionalSlider
                  id="port-engine"
                  orientation="vertical"
                  min={-100}
                  max={100}
                  step={10}
                  value={[controls.portEngine]}
                  onValueChange={(val) => onControlChange("portEngine", val[0])}
                />
              </div>
              <div className="flex flex-col items-center space-y-3 h-48">
                <Label htmlFor="stbd-engine" className="text-center">
                  Stbd Engine{" "}
                  <span className="block font-mono mt-1">
                    {controls.stbdEngine}%
                  </span>
                </Label>
                <BiDirectionalSlider
                  id="stbd-engine"
                  orientation="vertical"
                  min={-100}
                  max={100}
                  step={10}
                  value={[controls.stbdEngine]}
                  onValueChange={(val) => onControlChange("stbdEngine", val[0])}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="port-rudder" className="flex justify-between">
                  <span>Port Rudder</span>
                  <span className="font-mono">{controls.portRudder}°</span>
                </Label>
                <BiDirectionalSlider
                  id="port-rudder"
                  min={-35}
                  max={35}
                  step={1}
                  value={[controls.portRudder]}
                  onValueChange={(val) => onControlChange("portRudder", val[0])}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="stbd-rudder" className="flex justify-between">
                  <span>Stbd Rudder</span>
                  <span className="font-mono">{controls.stbdRudder}°</span>
                </Label>
                <BiDirectionalSlider
                  id="stbd-rudder"
                  min={-35}
                  max={35}
                  step={1}
                  value={[controls.stbdRudder]}
                  onValueChange={(val) => onControlChange("stbdRudder", val[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
