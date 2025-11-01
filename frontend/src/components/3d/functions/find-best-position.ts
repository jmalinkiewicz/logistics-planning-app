import type { Box, Container } from "@/definitions";
import { isValidPosition } from "./is-valid-position";

export function findBestPosition(
  box: { width: number; height: number; depth: number },
  placedBoxes: Box[],
  container: Container
): { x: number; y: number; z: number } | null {
  const stepSize = 0.5; // Grid resolution for placement attempts

  // Try different heights (ground first, then stacked)
  const heightsToTry: number[] = [0];

  // Add potential stacking heights based on existing boxes
  for (const placed of placedBoxes) {
    const stackHeight = placed.y + placed.height / 2;
    if (!heightsToTry.includes(stackHeight)) {
      heightsToTry.push(stackHeight);
    }
  }

  heightsToTry.sort((a, b) => a - b); // Try lower positions first

  for (const baseY of heightsToTry) {
    const y = baseY + box.height / 2;

    // Check if box fits vertically
    if (y + box.height / 2 > container.maxY) continue;

    // Try positions from back to front, left to right
    for (
      let z = container.minZ + box.depth / 2;
      z <= container.maxZ - box.depth / 2;
      z += stepSize
    ) {
      for (
        let x = container.minX + box.width / 2;
        x <= container.maxX - box.width / 2;
        x += stepSize
      ) {
        // Check if position is valid
        if (isValidPosition(box, x, y, z, placedBoxes, baseY, container)) {
          return { x, y, z };
        }
      }
    }
  }

  return null;
}
