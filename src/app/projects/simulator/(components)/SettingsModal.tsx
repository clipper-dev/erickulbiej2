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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: SettingsState;
  onSave: (newSettings: SettingsState) => void;
}

export function SettingsModal({ isOpen, onClose, currentSettings, onSave }: SettingsModalProps) {
  const [settings, setSettings] = useState<SettingsState>(currentSettings);

  // Sync modal state if the external state changes while modal is open
  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings, isOpen]);

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Simulation Settings</DialogTitle>
          <DialogDescription>
            Adjust the visual settings for the simulator.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="grid-visibility" className="text-base">
              Show Grid
            </Label>
            <Switch
              id="grid-visibility"
              checked={settings.isGridVisible}
              onCheckedChange={(checked) =>
                setSettings((s) => ({ ...s, isGridVisible: checked }))
              }
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="grid-spacing" className="flex justify-between text-base">
              <span>Grid Spacing</span>
              <span className="font-mono text-muted-foreground">{settings.gridSpacing}m</span>
            </Label>
            <Slider
              id="grid-spacing"
              min={50}
              max={1000}
              step={50}
              value={[settings.gridSpacing]}
              onValueChange={(val) =>
                setSettings((s) => ({ ...s, gridSpacing: val[0] }))
              }
              disabled={!settings.isGridVisible}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}