import { describe, it, expect } from "vitest";
import { calculateBoundingBox } from "@/lib/calculate-bounding-box";

describe("calculateBoundingBox", () => {
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

  it("returns 0 volume for empty list", () => {
    const result = calculateBoundingBox([], container);
    expect(result.volume).toBe(0);
  });

  it("calculates bounding box for single box", () => {
    const boxes = [
      {
        id: "a",
        color: "",
        x: 5,
        y: 5,
        z: 5,
        width: 2,
        height: 2,
        depth: 2,
      },
    ];

    const result = calculateBoundingBox(boxes, container);
    expect(result.volume).toBe(8);
  });

  it("calculates bounding box for multiple boxes", () => {
    const boxes = [
      {
        id: "a",
        color: "",
        x: 2,
        y: 2,
        z: 2,
        width: 2,
        height: 2,
        depth: 2,
      },
      {
        id: "b",
        color: "",
        x: 8,
        y: 8,
        z: 8,
        width: 2,
        height: 2,
        depth: 2,
      },
    ];

    const result = calculateBoundingBox(boxes, container);
    expect(result.volume).toBe(512);
  });

  it("handles boxes touching container bounds", () => {
    const boxes = [
      {
        id: "a",
        color: "",
        x: 1,
        y: 1,
        z: 1,
        width: 2,
        height: 2,
        depth: 2,
      },
      {
        id: "b",
        color: "",
        x: 9,
        y: 9,
        z: 9,
        width: 2,
        height: 2,
        depth: 2,
      },
    ];

    const result = calculateBoundingBox(boxes, container);
    expect(result.volume).toBe(1000);
  });

  it("handles floating point precision", () => {
    const boxes = [
      {
        id: "float",
        color: "",
        x: 5.0001,
        y: 4.9999,
        z: 5.0002,
        width: 2,
        height: 2,
        depth: 2,
      },
    ];

    const result = calculateBoundingBox(boxes, container);
    expect(result.volume).toBeCloseTo(8, 5);
  });

  it("calculates bounding box for irregular layout", () => {
    const boxes = [
      {
        id: "a",
        color: "",
        x: 3,
        y: 1,
        z: 7,
        width: 2,
        height: 4,
        depth: 2,
      },
      {
        id: "b",
        color: "",
        x: 6,
        y: 6,
        z: 3,
        width: 4,
        height: 2,
        depth: 6,
      },
    ];

    const result = calculateBoundingBox(boxes, container);
    expect(result.volume).toBeCloseTo(384);
  });
});
