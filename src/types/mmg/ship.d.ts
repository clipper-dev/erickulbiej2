// All hydrodynamic coefficients are non-dimensional unless specified.

interface PrincipalParticulars {
  name: string;
  type: string;
  lengthOverall: number; // m
  lengthBetweenPerpendiculars: number; // m
  breadth: number; // m
  draft: number; // m
  blockCoefficient: number;
}

interface MassAndInertia {
  mass: number; // kg
  longitudinalCenterOfGravity: number; // m, from midship (+ve forward)
  momentOfInertiaZ: number; // kg*m^2
}

interface HullHydrodynamics {
  // Surge motion derivatives
  X_vv: number;
  X_vr: number;
  X_rr: number;
  X_vvvv: number;
  // Sway motion derivatives
  Y_v: number;
  Y_r: number;
  Y_vvv: number;
  Y_vvr: number;
  Y_vrr: number;
  Y_rrr: number;
  // Yaw motion derivatives
  N_v: number;
  N_r: number;
  N_vvv: number;
  N_vvr: number;
  N_vrr: number;
  N_rrr: number;
}

interface Propeller {
  count: number;
  type: string | "FPP" | "CPP"; // Fixed Pitch Propeller or Controllable Pitch Propeller
  diameter: number; // m
  rpm: number; // revolutions per minute
  locations: { x: number; y: number }[]; // m, from origin (midship, centerline)
  // Interaction coefficients
  thrustDeduction: number; // t_P
  wakeFraction: number; // w_P
  // Thrust and Torque coefficients would be functions, but we can store nominal values
  ktCoefficients: number[]; // Placeholder for K_T curve
  kqCoefficients: number[]; // Placeholder for K_Q curve
}

interface Rudder {
  count: number;
  totalArea: number; // m^2
  location: { x: number }; // m, from origin
  // Interaction coefficients
  rudderAreaRatio: number; // A_R / (L_pp * d)
  flowStraighteningCoefficient: number; // f_alpha
  rudderForceIncreaseFactor: number; // a_H
  rudderForceCenter: number; // x_H
}

interface ShipPerformance {
  maxSpeedKnots: number;
}

// The main ship data structure
interface ShipData {
  principalParticulars: PrincipalParticulars;
  massAndInertia: MassAndInertia;
  hull: HullHydrodynamics;
  propeller: Propeller;
  rudder: Rudder;
  performance: ShipPerformance;
}