import type { Box } from "@/definitions";
import { useState } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

interface BoxStackProps {
  boxes: Box[];
}

export function BoxStack({ boxes }: BoxStackProps) {
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null);

  return (
    <group>
      {boxes.map((box) => (
        <CargoBox
          key={box.id}
          box={box}
          isHovered={hoveredBoxId === box.id}
          onHover={setHoveredBoxId}
        />
      ))}
    </group>
  );
}

function CargoBox({
  box,
  isHovered,
  onHover,
}: {
  box: Box;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const gapScale = 0.98;

  return (
    <group position={[box.x, box.y, box.z]}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(box.id);
        }}
        onPointerOut={() => onHover(null)}
        scale={[gapScale, gapScale, gapScale]}
      >
        <boxGeometry args={[box.width, box.height, box.depth]} />
        <meshStandardMaterial
          color={box.color || "#3b82f6"}
          metalness={0.1}
          roughness={0.6}
          emissive={isHovered ? box.color || "#3b82f6" : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>

      <lineSegments scale={[gapScale, gapScale, gapScale]}>
        <edgesGeometry
          args={[new THREE.BoxGeometry(box.width, box.height, box.depth)]}
        />
        <lineBasicMaterial
          color="#000000"
          linewidth={1}
          opacity={0.3}
          transparent
        />
      </lineSegments>

      {isHovered && (
        <Html distanceFactor={10} position={[0, box.height / 2 + 0.3, 0]}>
          <div className="bg-background/95 backdrop-blur px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
            <div className="font-mono">
              {box.width.toFixed(1)} × {box.height.toFixed(1)} ×{" "}
              {box.depth.toFixed(1)} m
            </div>
            <div className="text-muted-foreground">
              Vol: {(box.width * box.height * box.depth).toFixed(2)} m³
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
