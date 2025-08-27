"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --- HELPERS ---
const knotsToMps = (knots: number) => knots * 0.514444;
const degToRad = (deg: number) => deg * (Math.PI / 180);

interface InitialValues {
  posX: number;
  posY: number;
  heading: number;
  speed: number;
}

const defaultValues: InitialValues = {
  posX: 0,
  posY: 0,
  heading: 0,
  speed: 0,
};

interface RestartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newMotionState: MotionState) => void;
  maxSpeedKnots: number;
}

export function RestartModal({
  isOpen,
  onClose,
  onConfirm,
  maxSpeedKnots,
}: RestartModalProps) {
  const [values, setValues] = useState<InitialValues>(defaultValues);

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);

  const handlePreset = (type: "stopped" | "full_speed_north") => {
    if (type === "stopped") {
      setValues(defaultValues);
    } else {
      setValues({
        posX: 0,
        posY: 0,
        heading: 0, // North
        speed: maxSpeedKnots,
      });
    }
  };

  const handleConfirm = () => {
    const newMotionState: MotionState = {
        position: {
          north: values.posX,
          east: values.posY,
          heading: degToRad(values.heading)
        },
        velocity: {
          surge: knotsToMps(values.speed),
          sway: 0,
          yaw: 0
        },
        acceleration: {
          surge: 0,
          sway: 0,
          yaw: 0
        },
        velocityOverGround: {
          north: 0,
          east: 0,
          speed: 0,
          course: 0
        }
    };
    onConfirm(newMotionState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Restart Simulation</DialogTitle>
          <DialogDescription>
            Set the initial state for the vessel.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handlePreset("stopped")}>
              Preset: Stopped
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePreset("full_speed_north")}
            >
              Preset: Full Speed, North
            </Button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="posX" className="text-right">Position X</Label>
            <Input id="posX" name="posX" type="number" value={values.posX} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="posY" className="text-right">Position Y</Label>
            <Input id="posY" name="posY" type="number" value={values.posY} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="heading" className="text-right">Heading (°)</Label>
            <Input id="heading" name="heading" type="number" value={values.heading} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="speed" className="text-right">Speed (kts)</Label>
            <Input id="speed" name="speed" type="number" value={values.speed} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={handleConfirm}>Apply & Restart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}