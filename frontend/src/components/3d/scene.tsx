import type { Box, BoxInput, Container, Parcel, Transit } from "@/definitions";
import { randomHex } from "@/lib/utils";
import { useData } from "@/providers/data-provider";
import { useEffect, useMemo, useState } from "react";
import {
  Environment,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { ContainerBox } from "./container-box";
import { BoxStack } from "./box-stack";
import ParcelBox from "./parcel-box";

export function Scene({
  item,
  isTransit = false,
}: {
  item: Parcel | Transit;
  isTransit: boolean;
}) {
  const data = useData();

  const parcelsForTransit: Parcel[] = useMemo(() => {
    if (!isTransit) return [];
    return data.parcels.filter(
      (parcel) => Number(parcel.transitId) === Number(item.id)
    );
  }, [isTransit, data.parcels, item.id]);

  const boxesInput: BoxInput[] = useMemo(() => {
    return parcelsForTransit.map((parcel, idx) => ({
      id: String(idx),
      width: parcel.widthM,
      height: parcel.heightM,
      depth: parcel.depthM,
      color: randomHex(),
    }));
  }, [parcelsForTransit]);

  const container: Container | undefined = useMemo(() => {
    if (!isTransit) return undefined;
    return {
      width: item.widthM,
      length: item.depthM,
      height: item.heightM,
      minX: -(item.widthM / 2),
      maxX: item.widthM / 2,
      minZ: -(item.depthM / 2),
      maxZ: item.depthM / 2,
      minY: 0,
      maxY: item.heightM,
    };
  }, [isTransit, item]);

  const [calculatedBoxes, setCalculatedBoxes] = useState<Box[]>([]);

  useEffect(() => {
    if (!container || boxesInput.length === 0) return;

    const worker = new Worker(
      new URL("@/components/3d/functions/box-worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.postMessage({ boxesInput, container });

    worker.onmessage = (e) => {
      setCalculatedBoxes(e.data);
      worker.terminate();
    };

    return () => worker.terminate();
  }, [boxesInput, container]);

  const parcelPosition: [number, number, number] = [0, item.heightM / 2, 0];

  console.log("Transit ID:", isTransit ? item.id : "N/A");
  console.log("Parcels for transit:", parcelsForTransit.length);
  console.log("Boxes input:", boxesInput.length);
  console.log("Calculated boxes:", calculatedBoxes.length);

  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      <Environment preset="warehouse" />
      <Grid
        args={[item.widthM * 2, item.depthM * 2]}
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

      {isTransit && container && (
        <ContainerBox
          width={container.width}
          height={container.height}
          depth={container.length}
        />
      )}

      {!isTransit && (
        <ParcelBox
          width={item.widthM}
          height={item.heightM}
          depth={item.depthM}
          position={parcelPosition}
          status={(item as Parcel).status}
        />
      )}

      {isTransit && <BoxStack boxes={calculatedBoxes} />}

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
