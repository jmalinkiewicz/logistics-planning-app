import { Separator } from "@/components/ui/separator";
import { Ruler } from "lucide-react";

type DimensionsProps = {
  height: number;
  width: number;
  depth: number;
};

export default function Dimensions({ height, width, depth }: DimensionsProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Container Dimensions</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Width</p>
          <p className="text-2xl font-bold">
            {width}
            <span className="text-base font-normal text-muted-foreground ml-1">
              m
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Height</p>
          <p className="text-2xl font-bold">
            {height}
            <span className="text-base font-normal text-muted-foreground ml-1">
              m
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Depth</p>
          <p className="text-2xl font-bold">
            {depth}
            <span className="text-base font-normal text-muted-foreground ml-1">
              m
            </span>
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Total Volume</span>
        <span className="text-lg font-semibold">
          {(width * height * depth).toFixed(2)} m<sup>3</sup>
        </span>
      </div>
    </>
  );
}
