import type { BoxGeometry } from "@/definitions";

export function getBoxOrientations(box: BoxGeometry) {
  const { width, height, depth } = box;

  const perms = [
    [width, height, depth],
    [width, depth, height],
    [height, width, depth],
    [height, depth, width],
    [depth, width, height],
    [depth, height, width],
  ];

  const seen = new Set();
  const unique = [];

  for (const [w, h, d] of perms) {
    const key = `${w}-${h}-${d}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push({ width: w, height: h, depth: d });
    }
  }

  return unique;
}
