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

  const mockBoxes: Box[] = useMemo(() => {
    const boxes: Box[] = [];
    const colors = [
      "#10b981",
      "#3b82f6",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
    ];

    for (let i = 0; i < 6; i++) {
      const width = 0.3 + Math.random() * 0.15;
      const height = 0.3 + Math.random() * 0.3;
      const depth = 0.5 + Math.random() * 0.2;

      boxes.push({
        id: String(i),
        width,
        height,
        depth,
        x: 0,
        y: height / 2,
        z: -1.5 + i * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    return boxes;
  }, []);

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
