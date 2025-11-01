import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useLocation, useParams } from "react-router";
import { useData } from "@/providers/data-provider";
import MockScene from "./mock-scene";
import { Scene } from "./scene";

export function Container3DView() {
  const data = useData();
  const location = useLocation();
  const { id } = useParams();

  const isParcelsRoute = location.pathname.startsWith("/parcels");
  const isTransitsRoute = location.pathname.startsWith("/transits");

  const item = useMemo(() => {
    if (isParcelsRoute) return data.parcels.find((p) => p.id === Number(id));
    if (isTransitsRoute) return data.transits.find((t) => t.id === Number(id));
    return null;
  }, [data.parcels, data.transits, id, isParcelsRoute, isTransitsRoute]);

  if (!item)
    return (
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <MockScene />
      </Canvas>
    );

  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Scene item={item} isTransit={isTransitsRoute} />
    </Canvas>
  );
}
