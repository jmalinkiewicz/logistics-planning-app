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
    const colors = [
      "#10b981",
      "#3b82f6",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
    ];

    return [
      // Column 1 - Left side (-0.11 x position)
      // Layer 1 (ground)
      {
        id: "0",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.1,
        z: -1.85,
        color: colors[0],
      },
      {
        id: "1",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.1,
        z: -1.55,
        color: colors[1],
      },
      {
        id: "2",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.1,
        z: -1.25,
        color: colors[2],
      },
      {
        id: "3",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.1,
        z: -0.95,
        color: colors[3],
      },

      // Layer 2
      {
        id: "4",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: -0.11,
        y: 0.29,
        z: -1.85,
        color: colors[4],
      },
      {
        id: "5",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: -0.11,
        y: 0.295,
        z: -1.55,
        color: colors[5],
      },
      {
        id: "6",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.3,
        z: -1.25,
        color: colors[0],
      },
      {
        id: "7",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: -0.11,
        y: 0.29,
        z: -0.95,
        color: colors[1],
      },

      // Layer 3
      {
        id: "8",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: -0.11,
        y: 0.465,
        z: -1.85,
        color: colors[2],
      },
      {
        id: "9",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.485,
        z: -1.55,
        color: colors[3],
      },
      {
        id: "10",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: -0.11,
        y: 0.48,
        z: -1.25,
        color: colors[4],
      },
      {
        id: "11",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: -0.11,
        y: 0.465,
        z: -0.95,
        color: colors[5],
      },

      // Layer 4
      {
        id: "12",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.655,
        z: -1.85,
        color: colors[0],
      },
      {
        id: "13",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: -0.11,
        y: 0.675,
        z: -1.55,
        color: colors[1],
      },
      {
        id: "14",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: -0.11,
        y: 0.66,
        z: -1.25,
        color: colors[2],
      },
      {
        id: "15",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.655,
        z: -0.95,
        color: colors[3],
      },

      // Layer 5
      {
        id: "16",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: -0.11,
        y: 0.845,
        z: -1.85,
        color: colors[4],
      },
      {
        id: "17",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: -0.11,
        y: 0.855,
        z: -1.55,
        color: colors[5],
      },
      {
        id: "18",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: -0.11,
        y: 0.85,
        z: -1.25,
        color: colors[0],
      },
      {
        id: "19",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: -0.11,
        y: 0.845,
        z: -0.95,
        color: colors[1],
      },

      // Column 2 - Right side (0.11 x position)
      // Layer 1 (ground)
      {
        id: "20",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.1,
        z: -1.85,
        color: colors[2],
      },
      {
        id: "21",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.1,
        z: -1.55,
        color: colors[3],
      },
      {
        id: "22",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.1,
        z: -1.25,
        color: colors[4],
      },
      {
        id: "23",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.1,
        z: -0.95,
        color: colors[5],
      },

      // Layer 2
      {
        id: "24",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: 0.11,
        y: 0.295,
        z: -1.85,
        color: colors[0],
      },
      {
        id: "25",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: 0.11,
        y: 0.29,
        z: -1.55,
        color: colors[1],
      },
      {
        id: "26",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.3,
        z: -1.25,
        color: colors[2],
      },
      {
        id: "27",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: 0.11,
        y: 0.295,
        z: -0.95,
        color: colors[3],
      },

      // Layer 3
      {
        id: "28",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.485,
        z: -1.85,
        color: colors[4],
      },
      {
        id: "29",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: 0.11,
        y: 0.475,
        z: -1.55,
        color: colors[5],
      },
      {
        id: "30",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: 0.11,
        y: 0.48,
        z: -1.25,
        color: colors[0],
      },
      {
        id: "31",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.485,
        z: -0.95,
        color: colors[1],
      },

      // Layer 4
      {
        id: "32",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: 0.11,
        y: 0.665,
        z: -1.85,
        color: colors[2],
      },
      {
        id: "33",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.675,
        z: -1.55,
        color: colors[3],
      },
      {
        id: "34",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: 0.11,
        y: 0.66,
        z: -1.25,
        color: colors[4],
      },
      {
        id: "35",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: 0.11,
        y: 0.665,
        z: -0.95,
        color: colors[5],
      },

      // Layer 5
      {
        id: "36",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: 0.11,
        y: 0.845,
        z: -1.85,
        color: colors[0],
      },
      {
        id: "37",
        width: 0.2,
        height: 0.18,
        depth: 0.3,
        x: 0.11,
        y: 0.855,
        z: -1.55,
        color: colors[1],
      },
      {
        id: "38",
        width: 0.2,
        height: 0.2,
        depth: 0.3,
        x: 0.11,
        y: 0.85,
        z: -1.25,
        color: colors[2],
      },
      {
        id: "39",
        width: 0.2,
        height: 0.19,
        depth: 0.3,
        x: 0.11,
        y: 0.845,
        z: -0.95,
        color: colors[3],
      },
    ];
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
