import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Dispatch, SetStateAction } from "react";

type SpaceProps = {
  weightKg: string;
  setWeightKg: Dispatch<SetStateAction<string>>;
  heightM: string;
  setHeightM: Dispatch<SetStateAction<string>>;
  widthM: string;
  setWidthM: Dispatch<SetStateAction<string>>;
  depthM: string;
  setDepthM: Dispatch<SetStateAction<string>>;
  label: string;
};

export default function Space({
  weightKg,
  setWeightKg,
  heightM,
  setHeightM,
  widthM,
  setWidthM,
  depthM,
  setDepthM,
  label,
}: SpaceProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter weight in kg"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>{label}</Label>
        <div className="grid grid-cols-3 gap-2">
          <div className="grid gap-2">
            <Label htmlFor="width" className="text-xs text-muted-foreground">
              Width
            </Label>
            <Input
              id="width"
              type="number"
              step="0.01"
              min="0"
              placeholder="Width"
              value={widthM}
              onChange={(e) => setWidthM(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height" className="text-xs text-muted-foreground">
              Height
            </Label>
            <Input
              id="height"
              type="number"
              step="0.01"
              min="0"
              placeholder="Height"
              value={heightM}
              onChange={(e) => setHeightM(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="depth" className="text-xs text-muted-foreground">
              Depth
            </Label>
            <Input
              id="depth"
              type="number"
              step="0.01"
              min="0"
              placeholder="Depth"
              value={depthM}
              onChange={(e) => setDepthM(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
