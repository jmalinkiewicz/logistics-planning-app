export function boxesCollide(
  box1: {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    depth: number;
  },
  box2: {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    depth: number;
  }
): boolean {
  const margin = 0.01; // Small margin to prevent floating point issues

  return (
    Math.abs(box1.x - box2.x) < (box1.width + box2.width) / 2 - margin &&
    Math.abs(box1.y - box2.y) < (box1.height + box2.height) / 2 - margin &&
    Math.abs(box1.z - box2.z) < (box1.depth + box2.depth) / 2 - margin
  );
}
