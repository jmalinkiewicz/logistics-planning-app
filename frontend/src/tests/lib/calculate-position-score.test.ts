import { describe, it, expect, vi } from "vitest";
import { calculatePositionScore } from "@/lib/calculate-position-score";
import { calculateBoundingBox } from "@/lib/calculate-bounding-box";
import type { Box, BoxGeometry, Container } from "@/definitions";

vi.mock("@/lib/calculate-bounding-box");

describe("calculatePositionScore", () => {
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

  const box: BoxGeometry = { width: 2, height: 2, depth: 2 };

  it("favors positions close to minX/minZ (lower score)", () => {
    vi.mocked(calculateBoundingBox).mockReturnValue({ volume: 100 });

    const score1 = calculatePositionScore(box, 0.5, 1, 0.5, [], container);
    const score2 = calculatePositionScore(box, 5, 1, 5, [], container);

    expect(score1).toBeLessThan(score2);
  });

  it("penalizes higher Y positions", () => {
    vi.mocked(calculateBoundingBox).mockReturnValue({ volume: 100 });

    const low = calculatePositionScore(box, 5, 1, 5, [], container);
    const high = calculatePositionScore(box, 5, 5, 5, [], container);

    expect(low).toBeLessThan(high);
  });

  it("penalizes positions far from existing boxes", () => {
    vi.mocked(calculateBoundingBox).mockReturnValue({ volume: 100 });

    const placed: Box[] = [
      {
        id: "p",
        x: 1,
        y: 0,
        z: 1,
        width: 2,
        height: 2,
        depth: 2,
      },
    ];

    const close = calculatePositionScore(box, 2, 0, 2, placed, container);
    const far = calculatePositionScore(box, 9, 0, 9, placed, container);

    expect(close).toBeLessThan(far);
  });

  it("includes bounding box volume in score", () => {
    vi.mocked(calculateBoundingBox)
      .mockReturnValueOnce({ volume: 50 })
      .mockReturnValueOnce({ volume: 500 });

    const scoreSmall = calculatePositionScore(box, 1, 1, 1, [], container);
    const scoreLarge = calculatePositionScore(box, 2, 2, 2, [], container);

    expect(scoreSmall).toBeLessThan(scoreLarge);
  });

  it("works with placed boxes and bounding box combined", () => {
    vi.mocked(calculateBoundingBox).mockReturnValue({ volume: 123 });

    const placed: Box[] = [
      {
        id: "a",
        x: 3,
        y: 1,
        z: 3,
        width: 2,
        height: 2,
        depth: 2,
      },
    ];

    const score = calculatePositionScore(box, 4, 1, 4, placed, container);
    expect(typeof score).toBe("number");
  });
});
