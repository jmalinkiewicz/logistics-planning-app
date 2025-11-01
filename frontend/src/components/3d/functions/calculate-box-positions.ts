import type { Box, BoxInput, Container } from "@/definitions";
import { findBestPosition } from "./find-best-position";

export function calculateBoxPositions(
  inputBoxes: BoxInput[],
  container: Container
): Box[] {
  const placedBoxes: Box[] = [];

  const sortedBoxes = [...inputBoxes].sort((a, b) => {
    const volA = a.width * a.height * a.depth;
    const volB = b.width * b.height * b.depth;
    return volB - volA;
  });

  for (const box of sortedBoxes) {
    const position = findBestPosition(box, placedBoxes, container);

    if (position) {
      placedBoxes.push({
        ...box,
        x: position.x,
        y: position.y,
        z: position.z,
      });
    }
  }

  return placedBoxes;
}
