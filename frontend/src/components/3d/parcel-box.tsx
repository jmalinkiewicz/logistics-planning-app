import { Html } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

export default function ParcelBox({
  width,
  height,
  depth,
  position,
  status,
}: {
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  status: string;
}) {
  const [hovered, setHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "#10b981";
      case "in-transit":
        return "#3b82f6";
      case "unassigned":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={getStatusColor(status)}
        transparent
        opacity={hovered ? 0.9 : 0.7}
        roughness={0.3}
        metalness={0.1}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial
          color="#ffffff"
          linewidth={1}
          opacity={0.8}
          transparent
        />
      </lineSegments>
      {hovered && (
        <Html distanceFactor={10} position={[0, height / 2 + 0.3, 0]}>
          <div className="bg-background/95 backdrop-blur px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
            <div className="font-mono">
              {width.toFixed(1)} × {height.toFixed(1)} × {depth.toFixed(1)} m
            </div>
            <div className="text-muted-foreground">
              Vol: {(width * height * depth).toFixed(2)} m³
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
}
