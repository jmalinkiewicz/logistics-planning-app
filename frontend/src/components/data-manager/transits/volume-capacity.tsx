import { Progress } from "@/components/ui/progress";
import { Package } from "lucide-react";

type WeightCapacityProps = {
  volume: number;
  maxVolume: number;
};

export default function VolumeCapacity({
  volume,
  maxVolume,
}: WeightCapacityProps) {
  const volumePercentage = (volume / maxVolume) * 100;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Volume Capacity</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-bold">{volume}</span>
          <span className="text-muted-foreground">
            / {maxVolume} m<sup>3</sup>
          </span>
        </div>
        <Progress value={volumePercentage} className="h-3" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current volume</span>
          <span className="font-medium">
            {volumePercentage.toFixed(1)}% utilized
          </span>
        </div>
      </div>
    </div>
  );
}
