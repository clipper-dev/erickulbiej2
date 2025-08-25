"use client";

const PIXELS_PER_METER = 0.5;

interface ShipProps {
  motion: MotionState;
  shipData: ShipData;
}

export function Ship({ motion, shipData }: ShipProps) {
  const shipWidthPx = shipData.principalParticulars.breadth * PIXELS_PER_METER;
  const shipLengthPx =
    shipData.principalParticulars.lengthBetweenPerpendiculars *
    PIXELS_PER_METER;

  // --- CORRECTED ROTATION LOGIC ---
  // 1. Convert the physics heading (yaw in radians) to degrees.
  const headingDegrees = motion.position.heading * (180 / Math.PI);

  // 2. Apply a +90 degree offset. This corrects for the difference between the
  //    CSS coordinate system and the navigational heading system.
  //    - Navigational 0° (North) should be UP.
  //    - Our component's default "bow" is LEFT.
  //    - A +90° CSS rotation turns LEFT to UP.
  const cssRotationDegrees = headingDegrees - 90;

  const shipContainerTransform = {
    // The X/Y translation logic remains correct.
    // X-axis (surge) aligns with CSS X-axis.
    // Y-axis (sway) is inverted for CSS's downward-positive Y-axis.
    transform: `
      translate(
        ${motion.position.north * PIXELS_PER_METER}px,
        ${-motion.position.east * PIXELS_PER_METER}px
      )
      rotate(${cssRotationDegrees}deg)
    `,
    width: `${shipLengthPx}px`,
    height: `${shipWidthPx}px`,
    transformOrigin: "center center",
  };

  return (
    <div className="absolute top-0 left-0" style={shipContainerTransform}>
      {/* Main Hull */}
      <div
        className="absolute w-full h-full bg-zinc-300"
        style={{
          // Creates the elongated, rounded bow shape.
          // Assumes the bow is pointing left in the div's coordinate space.
          borderTopLeftRadius: "20% 50%",
          borderBottomLeftRadius: "20% 50%",
          // The bow is 10% of the ship's length
        }}
      />

      {/* Bridge */}
      <div
        className="absolute bg-zinc-500/80 backdrop-blur-sm"
        style={{
          width: "5%", // The bridge structure is 5% of the ship's length
          height: "120%", // 1.1x the ship's width
          top: "-10%", // Center it vertically
          left: "13%", // Position from the bow
          // Creates the trapezoid shape for the bridge wings
          clipPath: "polygon(0 0%, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Port Funnel */}
      <div
        className="absolute bg-zinc-400 rounded-sm"
        style={{
          width: "10%", // 10% of ship's length
          height: "15%", // 15% of ship's width
          top: "0", // Aligned to the port side
          right: "30%", // Centered 30% from the stern
          transform: "translateX(50%)",
        }}
      />

      {/* Starboard Funnel */}
      <div
        className="absolute bg-zinc-400 rounded-sm"
        style={{
          width: "10%",
          height: "15%",
          bottom: "0", // Aligned to the starboard side
          right: "30%",
          transform: "translateX(50%)",
        }}
      />
    </div>
  );
}
