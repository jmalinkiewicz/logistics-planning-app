import type { Box, BoxInput, Container } from "@/definitions";
import { findBestPosition } from "./find-best-position";
import { getBoxOrientations } from "./get-box-orientations";

export function findBestPositionWithRotation(
  box: BoxInput,
  placedBoxes: Box[],
  container: Container
): {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
} | null {
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
