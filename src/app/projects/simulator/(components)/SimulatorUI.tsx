
"use client";

import { MapDisplay } from "./MapDisplay";
import { RightSidebar } from "./RightSidebar";
import { TopToolbar } from "./TopToolbar";

// All the imports from your previous page.tsx

// This component contains the exact same JSX as your old page.tsx
export function SimulatorUI() {
  return (
    // Main container: fixed position, covers the screen below the navbar, disables scrolling
    <div className="fixed top-12 left-0 right-0 bottom-0 overflow-hidden bg-zinc-100">
      <div className="flex h-full w-full">
        {/* Main Content Area */}
        <div className="flex-1 relative h-full">
          <TopToolbar />
          <MapDisplay />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}