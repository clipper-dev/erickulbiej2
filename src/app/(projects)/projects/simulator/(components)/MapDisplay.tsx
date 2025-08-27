"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MapControls } from "./map/MapControls";
import { Ship } from "./Ship"; // Import the new dedicated Ship component

const PIXELS_PER_METER = 0.5;

interface MapDisplayProps {
  motion: MotionState;
  shipData: ShipData;
  settings: SettingsState;
}

export function MapDisplay({ motion, shipData, settings }: MapDisplayProps) {
  // All state management for the camera remains the same.
  const [zoom, setZoom] = useState(1);
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [lockOffset, setLockOffset] = useState<{ x: number; y: number } | null>({ x: 0, y: 0 });

  const dragStartRef = useRef({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // All effects and handlers for camera logic remain the same.
  useEffect(() => {
    if (!isLocked || !lockOffset || !mapRef.current) return;
    const { clientWidth, clientHeight } = mapRef.current;
    const centerX = clientWidth / 2;
    const centerY = clientHeight / 2;
    const newViewOffsetX = centerX + lockOffset.x - (motion.position.east * PIXELS_PER_METER * zoom);
    const newViewOffsetY = centerY + lockOffset.y - (-motion.position.north * PIXELS_PER_METER * zoom);
    setViewOffset({ x: newViewOffsetX, y: newViewOffsetY });
  }, [isLocked, lockOffset, motion, zoom]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    if (isLocked) {
      setIsLocked(false);
      setLockOffset(null);
    }
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setViewOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!mapRef.current) return;
    const scale = direction === 'in' ? 1.25 : 0.8;
    const newZoom = Math.max(0.1, Math.min(zoom * scale, 10));
    const shipWorldX = motion.position.north * PIXELS_PER_METER;
    const shipWorldY = -motion.position.east * PIXELS_PER_METER;
    const newViewOffsetX = viewOffset.x - shipWorldX * (newZoom - zoom);
    const newViewOffsetY = viewOffset.y - shipWorldY * (newZoom - zoom);
    setViewOffset({ x: newViewOffsetX, y: newViewOffsetY });
    setZoom(newZoom);
  };

  const handleCenterOnShip = () => {
    setIsLocked(true);
    setLockOffset({ x: 0, y: 0 });
  };
  
  const handleToggleLock = () => {
    if (isLocked) {
      setIsLocked(false);
      setLockOffset(null);
    } else {
      if (!mapRef.current) return;
      const { clientWidth, clientHeight } = mapRef.current;
      const centerX = clientWidth / 2;
      const centerY = clientHeight / 2;
      const shipScreenX = viewOffset.x + (motion.position.east * PIXELS_PER_METER * zoom);
      const shipScreenY = viewOffset.y + (-motion.position.north * PIXELS_PER_METER * zoom);
      setLockOffset({
        x: shipScreenX - centerX,
        y: shipScreenY - centerY,
      });
      setIsLocked(true);
    }
  };

  // --- REWORKED RENDERING LOGIC ---

  // This transform pans and zooms the container for all world objects.
  const worldTransform = {
    transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${zoom})`,
  };

  // This style creates the grid.
  const gridStyle = {
    // 1. The size of each grid square is determined by the spacing and the current zoom level.
    backgroundSize: `${settings.gridSpacing * PIXELS_PER_METER * zoom}px ${settings.gridSpacing * PIXELS_PER_METER * zoom}px`,
    
    // 2. The position of the grid is tied to the viewOffset. This is the crucial fix
    //    that anchors the grid's (0,0) point to the world's (0,0) point.
    backgroundPosition: `${viewOffset.x}px ${viewOffset.y}px`,
    
    // 3. We use efficient repeating gradients for the lines.
    backgroundImage: `
      repeating-linear-gradient(to right, hsl(210 40% 50% / 0.15) 0 1px, transparent 1px 100%),
      repeating-linear-gradient(to bottom, hsl(210 40% 50% / 0.15) 0 1px, transparent 1px 100%)
    `,
  };
  return (
    <div
      ref={mapRef}
      className={cn(
        "w-full h-full bg-blue-100 relative overflow-hidden select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* The Grid Layer (z-0, behind everything) */}
      {settings.isGridVisible && (
        <div
          className="absolute inset-0 z-0"
          style={gridStyle}
        />
      )}

      {/* The World Layer (z-10, contains the ship) */}
      <div
        className="absolute inset-0 z-10"
        style={worldTransform}
      >
        <Ship motion={motion} shipData={shipData} />
      </div>

      {/* The UI Layer (z-20, on top of everything) */}
      <MapControls
        onZoomIn={() => handleZoom('in')}
        onZoomOut={() => handleZoom('out')}
        onCenter={handleCenterOnShip}
        onToggleLock={handleToggleLock}
        isLocked={isLocked}
      />
    </div>
  );
}