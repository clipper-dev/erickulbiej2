"use client";

import { useState, useEffect } from "react";

// This is the "slave" window. It listens for messages and displays data.

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

// Simple display component for a vector
function MotionParam({
  name,
  value,
  unit,
}: {
  name: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="flex justify-between items-baseline bg-zinc-800 p-2 rounded">
      <span className="text-zinc-400 text-sm">{name}</span>
      <span className="font-mono text-zinc-50">
        {value.toFixed(3)}
        <span className="text-xs text-zinc-400 ml-1">{unit}</span>
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const [motion, setMotion] = useState<MotionState>(initialMotionState);

  useEffect(() => {
    // Create or connect to the broadcast channel
    const channel = new BroadcastChannel("simulator_dashboard");

    // Define the message handler
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "MOTION_UPDATE") {
        setMotion(event.data.payload);
      }
    };

    // Listen for messages
    channel.addEventListener("message", handleMessage);

    // Clean up on component unmount
    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, []);

  return (
    <main className="bg-zinc-900 text-white p-4 h-screen font-sans">
      <h1 className="text-lg font-bold mb-4 border-b border-zinc-700 pb-2">
        Vessel Parameters
      </h1>
      <div className="space-y-2">
        <h2 className="text-md font-semibold text-zinc-300">Position</h2>
        <MotionParam name="Latitude (Y)" value={motion.position.north} unit="m" />
        <MotionParam name="Longitude (X)" value={motion.position.east} unit="m" />
        <MotionParam
          name="Yaw (HDG)"
          value={motion.position.heading * (180 / Math.PI)}
          unit="°"
        />
        <h2 className="text-md font-semibold text-zinc-300 mt-4">Velocity</h2>
        <MotionParam
          name="Surge (u)"
          value={motion.velocity.surge}
          unit="m/s"
        />
        <MotionParam name="Sway (v)" value={motion.velocity.sway} unit="m/s" />
        <MotionParam
          name="Yaw (r)"
          value={motion.velocity.yaw * (180 / Math.PI)}
          unit="°/s"
        />
        <h2 className="text-md font-semibold text-zinc-300 mt-4">
          Acceleration
        </h2>
        <MotionParam
          name="Surge (u_dot)"
          value={motion.acceleration.surge}
          unit="m/s²"
        />
        <MotionParam
          name="Sway (v_dot)"
          value={motion.acceleration.sway}
          unit="m/s²"
        />
        <MotionParam
          name="Yaw (r_dot)"
          value={motion.acceleration.yaw * (180 / Math.PI)}
          unit="°/s²"
        />
      </div>
    </main>
  );
}
