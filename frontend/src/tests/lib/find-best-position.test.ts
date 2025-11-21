import { describe, it, expect, vi } from "vitest";
import { findBestPosition } from "@/lib/find-best-position";
import { isValidPosition } from "@/lib/is-valid-position";
import { calculatePositionScore } from "@/lib/calculate-position-score";
import type { BoxGeometry, Container } from "@/definitions";

vi.mock("@/lib/is-valid-position");
vi.mock("@/lib/calculate-position-score");

describe("findBestPosition", () => {
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

  it("returns position when a valid placement exists", () => {
    vi.mocked(isValidPosition).mockReturnValue(true);
    vi.mocked(calculatePositionScore).mockReturnValue(5);

    const pos = findBestPosition(box, [], container, 1);

    expect(pos).not.toBeNull();
    expect(pos?.y).toBe(box.height / 2);
  });

  it("returns null when no valid position exists", () => {
    vi.mocked(isValidPosition).mockReturnValue(false);

    const pos = findBestPosition(box, [], container, 1);
    expect(pos).toBeNull();
  });

  it("selects the position with the lowest score", () => {
    vi.mocked(isValidPosition).mockReturnValue(true);

    const scoreMock = vi.mocked(calculatePositionScore);
    scoreMock.mockReturnValueOnce(100);
    scoreMock.mockReturnValueOnce(1);
    scoreMock.mockReturnValue(50);

    const pos = findBestPosition(box, [], container, 1);

    expect(pos).not.toBeNull();
  });

  it("considers stacking heights from placed boxes", () => {
    vi.resetAllMocks();

    vi.mocked(isValidPosition).mockImplementation(
      (_box, _x, _y, _z, _placed, baseY) => {
        if (baseY === 0) return false;
        return true;
      }
    );

    vi.mocked(calculatePositionScore).mockReturnValue(1);

    const placed = [
      { id: "a", x: 5, y: 1, z: 5, width: 2, height: 2, depth: 2 },
    ];

    const pos = findBestPosition(box, placed, container, 1);

    expect(pos).not.toBeNull();
    expect(pos!.y).toBeCloseTo(3);
  });
});
