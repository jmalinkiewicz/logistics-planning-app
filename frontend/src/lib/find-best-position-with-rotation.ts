import type { Box, BoxInput, BoxPrimitive, Container } from "@/definitions";
import { findBestPosition } from "./find-best-position";
import { getBoxOrientations } from "./get-box-orientations";

export function findBestPositionWithRotation(
  box: BoxInput,
  placedBoxes: Box[],
  container: Container
): BoxPrimitive | null {
  const orientations = getBoxOrientations(box);

  for (const orientation of orientations) {
    const position = findBestPosition(orientation, placedBoxes, container);

    if (position) {
      return {
        ...position,
        width: orientation.width,
        height: orientation.height,
        depth: orientation.depth,
      };
    }
  }

  return null;
}
