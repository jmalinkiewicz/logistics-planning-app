import { describe, it, expect } from "vitest";
import { getBoxOrientations } from "@/lib/get-box-orientations";
import type { BoxInput } from "@/definitions";

describe("getBoxOrientations", () => {
  it("returns 6 orientations for a non-cubic box with all dimensions different", () => {
    const box: BoxInput = { id: "test", width: 1, height: 2, depth: 3 };
    const orientations = getBoxOrientations(box);

    expect(orientations.length).toBe(6);

    expect(orientations).toContainEqual({ width: 1, height: 2, depth: 3 });
    expect(orientations).toContainEqual({ width: 1, height: 3, depth: 2 });
    expect(orientations).toContainEqual({ width: 2, height: 1, depth: 3 });
    expect(orientations).toContainEqual({ width: 2, height: 3, depth: 1 });
    expect(orientations).toContainEqual({ width: 3, height: 1, depth: 2 });
    expect(orientations).toContainEqual({ width: 3, height: 2, depth: 1 });
  });

  it("returns fewer orientations when two dimensions are equal (e.g. 2×2×3)", () => {
    const box: BoxInput = { id: "test", width: 2, height: 2, depth: 3 };
    const orientations = getBoxOrientations(box);

    expect(orientations.length).toBe(3);

    expect(orientations).toContainEqual({ width: 2, height: 2, depth: 3 });
    expect(orientations).toContainEqual({ width: 2, height: 3, depth: 2 });
    expect(orientations).toContainEqual({ width: 3, height: 2, depth: 2 });
  });

  it("returns exactly 1 orientation for a perfect cube", () => {
    const box: BoxInput = { id: "test", width: 5, height: 5, depth: 5 };
    const orientations = getBoxOrientations(box);

    expect(orientations.length).toBe(1);
    expect(orientations[0]).toEqual({ width: 5, height: 5, depth: 5 });
  });

  it("does not return duplicate objects", () => {
    const box: BoxInput = { id: "test", width: 4, height: 4, depth: 2 };
    const orientations = getBoxOrientations(box);

    const keys = orientations.map((o) => `${o.width}-${o.height}-${o.depth}`);

    const uniqueKeys = new Set(keys);

    expect(uniqueKeys.size).toBe(orientations.length);
  });
});
