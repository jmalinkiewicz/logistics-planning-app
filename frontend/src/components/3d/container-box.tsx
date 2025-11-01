import * as THREE from "three";

export function ContainerBox({
  width,
  height,
  depth,
}: {
  width: number;
  height: number;
  depth: number;
}) {
  return (
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color="#1a1a1a"
        transparent
        opacity={0.15}
        wireframe={false}
        roughness={0.8}
        metalness={0.2}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color="#3b82f6" linewidth={2} />
      </lineSegments>
    </mesh>
  );
}
