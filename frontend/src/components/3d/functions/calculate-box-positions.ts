import type { Box, BoxInput, Container } from "@/definitions";
import { findBestPositionWithRotation } from "./find-best-position-with-rotation";

export function calculateBoxPositions(
  inputBoxes: BoxInput[],
  container: Container
): Box[] {
  const placedBoxes: Box[] = [];

  // Sort boxes by volume (largest first) for better packing
  const sortedBoxes = [...inputBoxes].sort((a, b) => {
    const volA = a.width * a.height * a.depth;
    const volB = b.width * b.height * b.depth;
    return volB - volA;
  });

  for (const box of sortedBoxes) {
    const result = findBestPositionWithRotation(box, placedBoxes, container);

    if (result) {
      placedBoxes.push({
        ...box,
        width: result.width,
        height: result.height,
        depth: result.depth,
        x: result.x,
        y: result.y,
        z: result.z,
      });
    }
  }

  return placedBoxes;
}
