import { boxesCollide } from "@/lib/boxes-collide";
import { describe, it, expect } from "vitest";

describe("boxesCollide", () => {
  it("returns false when boxes are far apart", () => {
    const a = { x: 0, y: 0, z: 0, width: 1, height: 1, depth: 1 };
    const b = { x: 5, y: 0, z: 0, width: 1, height: 1, depth: 1 };

    expect(boxesCollide(a, b)).toBe(false);
  });

  it("returns true when boxes overlap", () => {
    const a = { x: 0, y: 0, z: 0, width: 2, height: 2, depth: 2 };
    const b = { x: 0.5, y: 0, z: 0, width: 2, height: 2, depth: 2 };

    expect(boxesCollide(a, b)).toBe(true);
  });

  it("returns false when boxes only touch on X axis (edge contact)", () => {
    const a = { x: 0, y: 0, z: 0, width: 2, height: 2, depth: 2 };
    const b = { x: 2, y: 0, z: 0, width: 2, height: 2, depth: 2 };

    expect(boxesCollide(a, b)).toBe(false);
  });

  it("returns false when boxes only touch on Y axis (stacked contact)", () => {
    const a = { x: 0, y: 0, z: 0, width: 2, height: 2, depth: 2 };
    const b = { x: 0, y: 2, z: 0, width: 2, height: 2, depth: 2 };

    expect(boxesCollide(a, b)).toBe(false);
  });

  it("returns false when boxes only touch on Z axis", () => {
    const a = { x: 0, y: 0, z: 0, width: 2, height: 2, depth: 2 };
    const b = { x: 0, y: 0, z: 2, width: 2, height: 2, depth: 2 };

    expect(boxesCollide(a, b)).toBe(false);
  });

  it("returns false for diagonal corner touching", () => {
    const a = { x: 0, y: 0, z: 0, width: 2, height: 2, depth: 2 };
    const b = { x: 2, y: 2, z: 2, width: 2, height: 2, depth: 2 };

    expect(boxesCollide(a, b)).toBe(false);
  });

  it("returns true for deep overlap in all axes", () => {
    const a = { x: 0, y: 0, z: 0, width: 4, height: 4, depth: 4 };
    const b = { x: 1, y: 1, z: 1, width: 4, height: 4, depth: 4 };

    expect(boxesCollide(a, b)).toBe(true);
  });

  it("returns true for minimal overlap (just crossing collision margin)", () => {
    const a = { x: 0, y: 0, z: 0, width: 2, height: 2, depth: 2 };
    const b = { x: 0.99, y: 0, z: 0, width: 2, height: 2, depth: 2 };

    expect(boxesCollide(a, b)).toBe(true);
  });

  it("returns false when boxes are separated by just enough margin", () => {
    const a = { x: 0, y: 0, z: 0, width: 2, height: 2, depth: 2 };
    const b = { x: 2 - 0.01, y: 0, z: 0, width: 2, height: 2, depth: 2 };

    expect(boxesCollide(a, b)).toBe(false);
  });

  it("handles very small floating-point offsets without false positives", () => {
    const a = { x: 0, y: 0, z: 0, width: 1, height: 1, depth: 1 };
    const b = {
      x: 1.0001,
      y: 0.0001,
      z: 0.0001,
      width: 1,
      height: 1,
      depth: 1,
    };

    expect(boxesCollide(a, b)).toBe(false);
  });
});
