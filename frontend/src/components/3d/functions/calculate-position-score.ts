import type { Box, Container } from "@/definitions";
import { calculateBoundingBox } from "./calculate-bounding-box";

export function calculatePositionScore(
  box: { width: number; height: number; depth: number },
  x: number,
  y: number,
  z: number,
  placedBoxes: Box[],
  container: Container
): number {
  let score = 0;

  // Prefer positions closer to the back-left-bottom corner (origin of packing)
  score += Math.abs(x - container.minX) * 10; // Prefer left side
  score += Math.abs(z - container.minZ) * 10; // Prefer back side
  score += y * 5; // Prefer lower positions

  // Prefer positions adjacent to existing boxes (minimize gaps)
  let minDistanceToBox = Number.POSITIVE_INFINITY;
  for (const placed of placedBoxes) {
    const distance = Math.sqrt(
      Math.pow(x - placed.x, 2) +
        Math.pow(y - placed.y, 2) +
        Math.pow(z - placed.z, 2)
    );
    minDistanceToBox = Math.min(minDistanceToBox, distance);
  }

  // If there are placed boxes, penalize positions far from them
  if (placedBoxes.length > 0) {
    score += minDistanceToBox * 20;
  }

  // Prefer positions that minimize the overall bounding box
  const allBoxes = [
    ...placedBoxes,
    {
      x,
      y,
      z,
      width: box.width,
      height: box.height,
      depth: box.depth,
      id: "temp",
      color: "",
    },
  ];

  const boundingBox = calculateBoundingBox(allBoxes, container);
  score += boundingBox.volume * 0.1; // Prefer compact overall arrangement

  return score;
}
