export function boxesOverlap2D(
  box1: { x: number; z: number; width: number; depth: number },
  box2: { x: number; z: number; width: number; depth: number }
): boolean {
  return (
    Math.abs(box1.x - box2.x) < (box1.width + box2.width) / 2 &&
    Math.abs(box1.z - box2.z) < (box1.depth + box2.depth) / 2
  );
}
