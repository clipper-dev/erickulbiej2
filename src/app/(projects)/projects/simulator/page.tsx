import type { Metadata } from "next";
import { SimulatorUI } from "./(components)/SimulatorUI";

// This page.tsx is now a Server Component, so exporting metadata is allowed.
export const metadata: Metadata = {
  title: "Ship Maneuvering Simulator",
  description: "A 2D real-time ship maneuvering simulator created by Eric Kulbiej.",
};

export default function SimulatorPage() {
  // It simply returns the client component that holds all the interactive logic.
  return <SimulatorUI />;
}