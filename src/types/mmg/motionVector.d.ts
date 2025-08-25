 interface MotionState {
  // Earth-fixed position (NED: North-East-Down convention)
  position: {
    north: number;  // meters north of origin
    east: number;   // meters east of origin
    heading: number; // radians, ship's heading (yaw angle)
  };
  
  // Body-fixed velocities (ship's local frame)
  velocity: {
    surge: number;  // m/s forward/backward
    sway: number;   // m/s left/right
    yaw: number;    // rad/s rotation rate
  };
  
  // Body-fixed accelerations
  acceleration: {
    surge: number;  // m/s²
    sway: number;   // m/s²
    yaw: number;    // rad/s²
  };
  
  // For debugging/display
  velocityOverGround?: {
    north: number;
    east: number;
    speed: number;
    course: number;
  };
}

 interface ControlState {
  portRudder: number;    // degrees
  stbdRudder: number;    // degrees
  portEngine: number;    // percentage
  stbdEngine: number;    // percentage
}

 interface ShipData {
  massAndInertia: {
    mass: number;
    momentOfInertiaZ: number;
  };
  rudder: {
    location: { x: number };
  };
}