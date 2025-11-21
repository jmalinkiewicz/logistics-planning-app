import { describe, it, expect } from "vitest";
import { isValidPosition } from "@/lib/is-valid-position";

describe("isValidPosition", () => {
  const container = {
    width: 10,
    length: 10,
    height: 10,
    minX: 0,
    maxX: 10,
    minY: 0,
    maxY: 10,
    minZ: 0,
    maxZ: 10,
  };

  const simpleBox = { width: 2, height: 2, depth: 2 };

  it("returns true when box is inside container and nothing blocks it", () => {
    const result = isValidPosition(simpleBox, 5, 1, 5, [], 0, container);
    expect(result).toBe(true);
  });

  it("returns false when box goes out of container bounds", () => {
    const result = isValidPosition(simpleBox, -1, 1, 5, [], 0, container);
    expect(result).toBe(false);
  });

  it("returns false when colliding with an existing box", () => {
    const placed = [
      { x: 5, y: 1, z: 5, width: 2, height: 2, depth: 2, id: "a", color: "" },
    ];

    const result = isValidPosition(simpleBox, 5, 1, 5, placed, 0, container);
    expect(result).toBe(false);
  });

  it("returns true when near a box but not colliding", () => {
    const placed = [
      { x: 5, y: 1, z: 5, width: 2, height: 2, depth: 2, id: "a", color: "" },
    ];

    const result = isValidPosition(simpleBox, 7, 1, 5, placed, 0, container);
    expect(result).toBe(true);
  });

  it("returns false when baseY > 0 and there is no supporting box below", () => {
    const result = isValidPosition(simpleBox, 5, 3, 5, [], 2, container);
    expect(result).toBe(false);
  });

  it("returns true when baseY matches top of supporting box AND overlap exists", () => {
    const placed = [
      {
        x: 5,
        y: 1,
        z: 5,
        width: 2,
        height: 2,
        depth: 2,
        id: "floor",
        color: "",
      },
    ];

    const result = isValidPosition(simpleBox, 5, 3, 5, placed, 2, container);
    expect(result).toBe(true);
  });

  it("returns false when baseY matches top but no 2D overlap", () => {
    const placed = [
      {
        x: 8,
        y: 1,
        z: 8,
        width: 2,
        height: 2,
        depth: 2,
        id: "far",
        color: "",
      },
    ];

    const result = isValidPosition(simpleBox, 5, 3, 5, placed, 2, container);
    expect(result).toBe(false);
  });

  it("allows stacking with small floating error within tolerance", () => {
    const placed = [
      {
        x: 5,
        y: 1,
        z: 5,
        width: 2,
        height: 2,
        depth: 2,
        id: "support",
        color: "",
      },
    ];

    const result = isValidPosition(
      simpleBox,
      5,
      3.009,
      5,
      placed,
      2.009,
      container
    );

    expect(result).toBe(true);
  });

  it("rejects stacking if vertical mismatch > tolerance", () => {
    const placed = [
      {
        x: 5,
        y: 1,
        z: 5,
        width: 2,
        height: 2,
        depth: 2,
        id: "support",
        color: "",
      },
    ];

    const result = isValidPosition(
      simpleBox,
      5,
      3.02,
      5,
      placed,
      2.02,
      container
    );
    expect(result).toBe(false);
  });
});
