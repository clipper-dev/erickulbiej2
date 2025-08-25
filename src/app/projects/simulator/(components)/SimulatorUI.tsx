"use client";

import { useState, useEffect, useRef } from "react";

// Import Components
import { RightSidebar } from "./RightSidebar";
import { TopToolbar } from "./TopToolbar";
import { MapDisplay } from "./MapDisplay";
import { RestartModal } from "./RestartModal";
import { SettingsModal } from "./SettingsModal";

// Import Physics Engine
import {
  updateMotionState,
  interpolateMotion,
} from "@/lib/simulator/physicsEngine";

// Import Data
import shipDataJson from "@/data/ships/inisheer.json";
const shipData: ShipData = shipDataJson;

// --- CONSTANTS ---
const PHYSICS_TIMESTEP = 1.0; // Physics engine advances in 1-second increments

// --- INITIAL STATES ---
const initialMotionState: MotionState = {
  position: {
    north: 0,
    east: 0,
    heading: 0,
  },
  velocity: {
    surge: 0,
    sway: 0,
    yaw: 0,
  },
  acceleration: {
    surge: 0,
    sway: 0,
    yaw: 0,
  },
  velocityOverGround: {
    north: 0,
    east: 0,
    speed: 0,
    course: 0,
  },
};

const initialControlState: ControlState = {
  bowThruster: 0,
  portEngine: 0,
  stbdEngine: 0,
  portRudder: 0,
  stbdRudder: 0,
};

const initialSettings: SettingsState = {
  isGridVisible: true,
  gridSpacing: 500,
};

// --- ADD A BROADCAST CHANNEL INSTANCE (outside the component) ---
const channel = new BroadcastChannel("simulator_dashboard");

export function SimulatorUI() {
  // The "true" state of the simulation, updated by the physics engine
  const [motion, setMotion] = useState<MotionState>(initialMotionState);

  // --- ADD A REF FOR THE POPUP WINDOW ---
  const popupRef = useRef<Window | null>(null);

  const [displayMotion, setDisplayMotion] =
    useState<MotionState>(initialMotionState);
  // THE KEY FIX: Use a ref for the previous state to avoid async state lag.
  const previousMotionRef = useRef<MotionState>(initialMotionState);

  // UI and Control states
  const [controls, setControls] = useState<ControlState>(initialControlState);
  const [settings, setSettings] = useState<SettingsState>(initialSettings);
  const [isPaused, setIsPaused] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const lastFrameTimeRef = useRef<number>(performance.now());
  const timeAccumulatorRef = useRef<number>(0);

  const handleOpenDashboard = () => {
    // If the window already exists and is open, just focus it.
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
      return;
    }

    // Define the window features for a clean "panel" look
    const windowFeatures =
      "width=400,height=600,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=no";

    // Open the new window and store its reference
    popupRef.current = window.open(
      "/projects/simulator/dashboard",
      "_blank",
      windowFeatures
    );
  };

  // --- MAIN SIMULATION & RENDER LOOP ---
  useEffect(() => {
    let animationFrameId: number;
    const gameLoop = (timestamp: number) => {
      const realDeltaTime = (timestamp - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = timestamp;

      if (!isPaused) {
        const scaledDeltaTime = realDeltaTime * timeScale;
        setElapsedTime((prev) => prev + scaledDeltaTime);
        timeAccumulatorRef.current += scaledDeltaTime;

        // Physics Loop (Fixed Timestep)
        while (timeAccumulatorRef.current >= PHYSICS_TIMESTEP) {
          setMotion((currentMotion) => {
            // Synchronously update the ref with the state *before* the physics step
            previousMotionRef.current = currentMotion;
            return updateMotionState(
              currentMotion,
              controls,
              shipData,
              PHYSICS_TIMESTEP
            );
          });
          timeAccumulatorRef.current -= PHYSICS_TIMESTEP;
        }
      }

      // Render Interpolation
      const alpha = timeAccumulatorRef.current / PHYSICS_TIMESTEP;
      const newDisplayMotion = interpolateMotion(
        previousMotionRef.current,
        motion,
        alpha
      );
      setDisplayMotion(newDisplayMotion);

      // --- NEW: BROADCAST THE LATEST DATA ---
      // Check if the popup exists and is not closed by the user
      if (popupRef.current && !popupRef.current.closed) {
        channel.postMessage({
          type: "MOTION_UPDATE",
          payload: newDisplayMotion,
        });
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop); 
    
    // --- NEW: CLEANUP EFFECT ---
    // Ensure the popup is closed when the main component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    };
  }, [isPaused, timeScale, controls]);

  // --- HANDLERS ---
  const handleTogglePlayPause = () => setIsPaused((prev) => !prev);
  const handleTimeSlower = () =>
    setTimeScale((prev) => Math.max(0.125, prev / 2));
  const handleTimeFaster = () => setTimeScale((prev) => Math.min(8, prev * 2));
  const handleTimeReset = () => setTimeScale(1);
  const handleStop = () => {
    setIsPaused(true);
    setTimeScale(1);
  };
  const handleRestartConfirm = (newMotionState: MotionState) => {
    setMotion(newMotionState);
    previousMotionRef.current = newMotionState; // Also reset the ref
    setDisplayMotion(newMotionState);
    setDisplayMotion(newMotionState);
    setElapsedTime(0);
    timeAccumulatorRef.current = 0;
    setIsPaused(true);
    setTimeScale(1);
    setIsRestartModalOpen(false);
  };
  const handleControlChange = (key: keyof ControlState, value: number) => {
    setControls((prev) => ({ ...prev, [key]: value }));
  };
  const handleSaveSettings = (newSettings: SettingsState) => {
    setSettings(newSettings);
  };

  return (
    <div className="fixed top-12 left-0 right-0 bottom-0 overflow-hidden bg-zinc-100">
      <div className="flex h-full w-full">
        <div className="flex-1 relative h-full">
          <TopToolbar
            isPaused={isPaused}
            timeScale={timeScale}
            elapsedTime={elapsedTime}
            onTogglePlayPause={handleTogglePlayPause}
            onTimeSlower={handleTimeSlower}
            onTimeReset={handleTimeReset}
            onTimeFaster={handleTimeFaster}
            onStop={handleStop}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onRestart={() => setIsRestartModalOpen(true)}
          />
          <MapDisplay
            motion={displayMotion}
            shipData={shipData}
            settings={settings}
          />
        </div>
        <RightSidebar
          motion={displayMotion}
          controls={controls}
          onControlChange={handleControlChange}
          onOpenDashboard={handleOpenDashboard}
        />
      </div>
      <RestartModal
        isOpen={isRestartModalOpen}
        onClose={() => setIsRestartModalOpen(false)}
        onConfirm={handleRestartConfirm}
        maxSpeedKnots={shipData.performance.maxSpeedKnots}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentSettings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
