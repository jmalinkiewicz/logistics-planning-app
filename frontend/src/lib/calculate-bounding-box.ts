import type { Container } from "@/definitions";

export function calculateBoundingBox(
  boxes: Array<{
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    depth: number;
  }>,
  container: Container
): { volume: number } {
  if (boxes.length === 0) return { volume: 0 };

  let minX = container.maxX;
  let maxX = container.minX;
  let minY = container.maxY;
  let maxY = container.minY;
  let minZ = container.maxZ;
  let maxZ = container.minZ;

  for (const box of boxes) {
    minX = Math.min(minX, box.x - box.width / 2);
    maxX = Math.max(maxX, box.x + box.width / 2);
    minY = Math.min(minY, box.y - box.height / 2);
    maxY = Math.max(maxY, box.y + box.height / 2);
    minZ = Math.min(minZ, box.z - box.depth / 2);
    maxZ = Math.max(maxZ, box.z + box.depth / 2);
  }

  const volume = (maxX - minX) * (maxY - minY) * (maxZ - minZ);
  return { volume };
}
