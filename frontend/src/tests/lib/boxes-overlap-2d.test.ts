import { describe, it, expect } from "vitest";
import { boxesOverlap2D } from "@/lib/boxes-overlap-2d";

describe("boxesOverlap2D", () => {
  it("returns true when boxes overlap in both X and Z", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 0.5, z: 0.5, width: 2, depth: 2 };

    expect(boxesOverlap2D(a, b)).toBe(true);
  });

  it("returns false when boxes are far apart on X axis", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 5, z: 0, width: 2, depth: 2 };

    expect(boxesOverlap2D(a, b)).toBe(false);
  });

  it("returns false when boxes are far apart on Z axis", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 0, z: 5, width: 2, depth: 2 };

    expect(boxesOverlap2D(a, b)).toBe(false);
  });

  it("returns false when boxes only touch on X edge", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 2, z: 0, width: 2, depth: 2 };

    expect(boxesOverlap2D(a, b)).toBe(false);
  });

  it("returns false when boxes only touch on Z edge", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 0, z: 2, width: 2, depth: 2 };

    expect(boxesOverlap2D(a, b)).toBe(false);
  });

  it("returns false for diagonal corner touching", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 2, z: 2, width: 2, depth: 2 };

    expect(boxesOverlap2D(a, b)).toBe(false);
  });

  it("returns true for very small overlap on both axes", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 0.99, z: 0.99, width: 2, depth: 2 };

    expect(boxesOverlap2D(a, b)).toBe(true);
  });

  it("handles floating point precision: barely NOT overlapping", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 2.001, z: 0, width: 2, depth: 2 }; // slightly more than touching

    expect(boxesOverlap2D(a, b)).toBe(false);
  });

  it("handles floating point precision: barely overlapping", () => {
    const a = { x: 0, z: 0, width: 2, depth: 2 };
    const b = { x: 1.999, z: 0, width: 2, depth: 2 }; // tiny overlap

    expect(boxesOverlap2D(a, b)).toBe(true);
  });
});
