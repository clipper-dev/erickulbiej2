/**
 * Normalizes an angle to the range [-π, π]
 */
function normalizeAngle(angle: number): number {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
}

/**
 * Calculates the shortest angular distance between two angles
 */
function angularDifference(a: number, b: number): number {
  let diff = b - a;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  return diff;
}

/**
 * Corrected physics calculation with proper coordinate transformations
 */
export function updateMotionState(
  prevState: MotionState,
  controls: ControlState,
  shipData: ShipData,
  dt: number
): MotionState {
  // --- 1. EXTRACT CURRENT STATE ---
  const u = prevState.velocity.surge;     // body-frame surge velocity
  const v = prevState.velocity.sway;      // body-frame sway velocity
  const r = prevState.velocity.yaw;       // yaw rate
  const psi = prevState.position.heading; // heading angle
  
  // --- 2. CALCULATE FORCES IN BODY FRAME ---
  
  // Rudder force (simplified model)
  const rudderAngleRad = (controls.portRudder + controls.stbdRudder) / 2 * (Math.PI / 180);
  const rudderLiftCoeff = 0.3; // typical value
  const rudderArea = 20; // m² (example)
  const waterDensity = 1025; // kg/m³
  
  // Rudder force depends on flow velocity over rudder
  const flowSpeed = Math.sqrt(u * u + v * v);
  const rudderForceY = -0.5 * waterDensity * rudderArea * flowSpeed * flowSpeed * 
                        rudderLiftCoeff * Math.sin(rudderAngleRad);
  const rudderMomentN = rudderForceY * shipData.rudder.location.x;
  
  // Propeller thrust
  const thrustCoeff = 5000; // N per percent
  const thrustForceX = ((controls.portEngine + controls.stbdEngine) / 2) * thrustCoeff;
  
  // Hydrodynamic drag (simplified quadratic model)
  const dragCoeffX = 2000;
  const dragCoeffY = 3000;
  const dragForceX = -dragCoeffX * u * Math.abs(u);
  const dragForceY = -dragCoeffY * v * Math.abs(v);
  
  // Damping moment for yaw
  const yawDampingCoeff = 50000;
  const dampingMomentN = -yawDampingCoeff * r * Math.abs(r);
  
  // --- 3. SUM FORCES AND CALCULATE ACCELERATIONS ---
  const totalForceX = thrustForceX + dragForceX;
  const totalForceY = rudderForceY + dragForceY;
  const totalMomentN = rudderMomentN + dampingMomentN;
  
  // Account for added mass effects (simplified)
  const addedMassX = shipData.massAndInertia.mass * 0.05;
  const addedMassY = shipData.massAndInertia.mass * 0.20;
  
  const u_dot = totalForceX / (shipData.massAndInertia.mass + addedMassX);
  const v_dot = totalForceY / (shipData.massAndInertia.mass + addedMassY);
  const r_dot = totalMomentN / shipData.massAndInertia.momentOfInertiaZ;
  
  // --- 4. INTEGRATE BODY-FRAME VELOCITIES ---
  const u_new = u + u_dot * dt;
  const v_new = v + v_dot * dt;
  const r_new = r + r_dot * dt;
  
  // --- 5. TRANSFORM BODY VELOCITIES TO EARTH FRAME ---
  // Correct rotation matrix from body to Earth (NED) frame:
  // [vN]   [cos(ψ)  -sin(ψ)] [u]
  // [vE] = [sin(ψ)   cos(ψ)] [v]
  
  const cos_psi = Math.cos(psi);
  const sin_psi = Math.sin(psi);
  
  const velThroughWater_North = u_new * cos_psi - v_new * sin_psi;
  const velThroughWater_East = u_new * sin_psi + v_new * cos_psi;
  
  // --- 6. ADD CURRENT VECTOR (EARTH FRAME) ---
  const currentSpeed_mps = 1.0;
  const currentDirection_rad = 270 * (Math.PI / 180); // From west
  
  const current_North = currentSpeed_mps * Math.sin(currentDirection_rad);
  const current_East = currentSpeed_mps * Math.cos(currentDirection_rad);
  
  const velOverGround_North = velThroughWater_North + current_North;
  const velOverGround_East = velThroughWater_East + current_East;
  
  // --- 7. INTEGRATE POSITION ---
  const north_new = prevState.position.north + velOverGround_North * dt;
  const east_new = prevState.position.east + velOverGround_East * dt;
  const heading_new = normalizeAngle(psi + r_new * dt);
  
  // --- 8. CALCULATE DERIVED QUANTITIES ---
  const sog = Math.sqrt(velOverGround_North * velOverGround_North + 
                        velOverGround_East * velOverGround_East);
  const cog = Math.atan2(velOverGround_East, velOverGround_North);
  
  // --- 9. RETURN NEW STATE ---
  return {
    position: {
      north: north_new,
      east: east_new,
      heading: heading_new
    },
    velocity: {
      surge: u_new,
      sway: v_new,
      yaw: r_new
    },
    acceleration: {
      surge: u_dot,
      sway: v_dot,
      yaw: r_dot
    },
    velocityOverGround: {
      north: velOverGround_North,
      east: velOverGround_East,
      speed: sog,
      course: cog
    }
  };
}

/**
 * Properly interpolates motion states handling angular wrapping
 */
export function interpolateMotion(
  prev: MotionState,
  current: MotionState,
  alpha: number
): MotionState {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  
  // Handle angular interpolation for heading
  const headingDiff = angularDifference(prev.position.heading, current.position.heading);
  const interpolatedHeading = normalizeAngle(prev.position.heading + headingDiff * alpha);
  
  return {
    position: {
      north: lerp(prev.position.north, current.position.north, alpha),
      east: lerp(prev.position.east, current.position.east, alpha),
      heading: interpolatedHeading
    },
    velocity: {
      surge: lerp(prev.velocity.surge, current.velocity.surge, alpha),
      sway: lerp(prev.velocity.sway, current.velocity.sway, alpha),
      yaw: lerp(prev.velocity.yaw, current.velocity.yaw, alpha)
    },
    acceleration: current.acceleration, // Don't interpolate accelerations
    velocityOverGround: current.velocityOverGround // Use current frame's calculated values
  };
}