import type { BoxInput } from "@/definitions";

export function getBoxOrientations(box: BoxInput): Array<{ width: number; height: number; depth: number }> {
  const { width, height, depth } = box

  // Generate all 6 unique orientations
  const orientations = [
    { width, height, depth }, // original
    { width: width, height: depth, depth: height }, // rotate around X
    { width: height, height: width, depth }, // rotate around Z
    { width: height, height: depth, depth: width }, // rotate around Y
    { width: depth, height: width, depth: height }, // rotate around Z then X
    { width: depth, height: height, depth: width }, // rotate around X then Y
  ]

  // Remove duplicate orientations (e.g., for cubes)
  const unique = orientations.filter(
    (orient, index, self) =>
      index ===
      self.findIndex((o) => o.width === orient.width && o.height === orient.height && o.depth === orient.depth),
  )

  return unique
}