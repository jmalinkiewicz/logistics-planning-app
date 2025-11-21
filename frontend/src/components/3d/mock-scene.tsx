import type { Box } from "@/definitions";
import {
  Environment,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useMemo } from "react";
import { ContainerBox } from "./container-box";
import { BoxStack } from "./box-stack";

export default function MockScene() {
  const colors = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  function makeStack(x: number) {
    return [...Array(5)].flatMap((_, layer) => {
      const baseY = 0.1 + layer * 0.2;
      return [...Array(4)].map((__, idx) => ({
        id: crypto.randomUUID(),
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x,
        y: baseY,
        z: -1.85 + idx * 0.3,
        color: colors[(layer * 4 + idx) % colors.length],
      }));
    });
  }

  const mockBoxes: Box[] = useMemo(() => {
    return [...makeStack(-0.11), ...makeStack(0.11)];
  }, []);

  const mockContainer = useMemo(
    () => ({
      width: 1,
      length: 4,
      height: 1,
      minX: -0.5,
      maxX: 0.5,
      minZ: -2,
      maxZ: 2,
      minY: 0,
      maxY: 1,
    }),
    []
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />

      <Environment preset="warehouse" />

      <Grid
        args={[mockContainer.width * 2, mockContainer.length * 2]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#3b82f6"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#1e40af"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        position={[0, 0, 0]}
      />

      <ContainerBox
        width={mockContainer.width}
        height={mockContainer.height}
        depth={mockContainer.length}
      />

      <BoxStack boxes={mockBoxes} />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}
