import type { Box, BoxInput, Container } from "@/definitions";
import { boxesCollide } from "./boxes-collide";
import { boxesOverlap2D } from "./boxes-overlap-2d";

export function isValidPosition(
  box: BoxInput,
  x: number,
  y: number,
  z: number,
  placedBoxes: Box[],
  baseY: number,
  container: Container
): boolean {
  const halfWidth = box.width / 2;
  const halfHeight = box.height / 2;
  const halfDepth = box.depth / 2;

  // Check container bounds
  if (
    x - halfWidth < container.minX ||
    x + halfWidth > container.maxX ||
    z - halfDepth < container.minZ ||
    z + halfDepth > container.maxZ ||
    y - halfHeight < container.minY ||
    y + halfHeight > container.maxY
  ) {
    return false;
  }

  // Check collisions with other boxes
  for (const placed of placedBoxes) {
    if (
      boxesCollide(
        { x, y, z, width: box.width, height: box.height, depth: box.depth },
        placed
      )
    ) {
      return false;
    }
  }

  // If not on ground, check if there's support below
  if (baseY > 0) {
    const hasSupport = placedBoxes.some((placed) => {
      const supportTop = placed.y + placed.height / 2;
      // Check if this box is directly below and provides support
      return (
        Math.abs(supportTop - baseY) < 0.01 && // Box top matches our base
        boxesOverlap2D(
          { x, z, width: box.width, depth: box.depth },
          { x: placed.x, z: placed.z, width: placed.width, depth: placed.depth }
        )
      );
    });

    if (!hasSupport) return false;
  }

  return true;
}
