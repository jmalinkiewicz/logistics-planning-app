import { describe, it, expect, vi } from "vitest";
import { calculateBoxPositions } from "@/lib/calculate-box-positions";
import { findBestPositionWithRotation } from "@/lib/find-best-position-with-rotation";
import type { BoxInput, Container } from "@/definitions";

vi.mock("@/lib/find-best-position-with-rotation");

describe("calculateBoxPositions", () => {
  const container: Container = {
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

  it("returns empty list when no boxes provided", () => {
    const result = calculateBoxPositions([], container);
    expect(result).toEqual([]);
  });

  it("sorts boxes by volume and places them in that order", () => {
    const inputs: BoxInput[] = [
      { id: "small", width: 1, height: 1, depth: 1 },
      { id: "big", width: 2, height: 2, depth: 2 },
    ];

    const mock = vi.mocked(findBestPositionWithRotation);

    mock
      .mockReturnValueOnce({
        x: 1,
        y: 1,
        z: 1,
        width: 2,
        height: 2,
        depth: 2,
      })
      .mockReturnValueOnce({
        x: 3,
        y: 1,
        z: 1,
        width: 1,
        height: 1,
        depth: 1,
      });

    const result = calculateBoxPositions(inputs, container);

    expect(result.length).toBe(2);
    expect(result[0].id).toBe("big");
    expect(result[1].id).toBe("small");
  });

  it("appends placed box with correct position and orientation", () => {
    const inputs: BoxInput[] = [{ id: "test", width: 1, height: 1, depth: 1 }];

    vi.mocked(findBestPositionWithRotation).mockReturnValueOnce({
      x: 4,
      y: 2,
      z: 1,
      width: 1,
      height: 2,
      depth: 3,
    });

    const result = calculateBoxPositions(inputs, container);

    expect(result[0]).toMatchObject({
      id: "test",
      x: 4,
      y: 2,
      z: 1,
      width: 1,
      height: 2,
      depth: 3,
    });
  });

  it("skips boxes that cannot be placed", () => {
    const inputs: BoxInput[] = [{ id: "skip", width: 1, height: 1, depth: 1 }];

    vi.mocked(findBestPositionWithRotation).mockReturnValueOnce(null);

    const result = calculateBoxPositions(inputs, container);

    expect(result).toEqual([]);
  });
});
