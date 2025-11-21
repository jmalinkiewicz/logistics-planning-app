import { describe, it, expect, vi, beforeEach } from "vitest";
import { findBestPositionWithRotation } from "@/lib/find-best-position-with-rotation";
import { getBoxOrientations } from "@/lib/get-box-orientations";
import { findBestPosition } from "@/lib/find-best-position";
import type { BoxInput, Box, Container } from "@/definitions";

vi.mock("@/lib/get-box-orientations");
vi.mock("@/lib/find-best-position");

describe("findBestPositionWithRotation", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

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

  const placed: Box[] = [];

  const input: BoxInput = {
    id: "A",
    width: 2,
    height: 3,
    depth: 4,
  };

  it("returns the first successful orientation", () => {
    const orientations = [
      { width: 2, height: 3, depth: 4 },
      { width: 3, height: 2, depth: 4 },
    ];

    vi.mocked(getBoxOrientations).mockReturnValue(orientations);

    // first orientation fails
    vi.mocked(findBestPosition)
      .mockReturnValueOnce(null)
      // second orientation succeeds
      .mockReturnValueOnce({ x: 1, y: 2, z: 3 });

    const result = findBestPositionWithRotation(input, placed, container);

    expect(result).not.toBeNull();
    expect(result).toEqual({
      x: 1,
      y: 2,
      z: 3,
      width: 3,
      height: 2,
      depth: 4,
    });
  });

  it("returns null when no orientation fits", () => {
    vi.mocked(getBoxOrientations).mockReturnValue([
      { width: 1, height: 2, depth: 3 },
      { width: 2, height: 3, depth: 1 },
    ]);

    vi.mocked(findBestPosition).mockReturnValue(null);

    const result = findBestPositionWithRotation(input, placed, container);

    expect(result).toBeNull();
  });

  it("tries orientations in order", () => {
    const orientations = [
      { width: 1, height: 2, depth: 3 },
      { width: 2, height: 1, depth: 3 },
      { width: 3, height: 2, depth: 1 },
    ];

    vi.mocked(getBoxOrientations).mockReturnValue(orientations);

    vi.mocked(findBestPosition)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce({ x: 5, y: 5, z: 5 });

    const result = findBestPositionWithRotation(input, placed, container);

    expect(findBestPosition).toHaveBeenCalledTimes(3);
    expect(result).toEqual({
      x: 5,
      y: 5,
      z: 5,
      width: 3,
      height: 2,
      depth: 1,
    });
  });
});
