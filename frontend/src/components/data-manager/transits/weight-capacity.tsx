import { Progress } from "@/components/ui/progress";
import { Weight } from "lucide-react";

type WeightCapacityProps = {
  load: number;
  maxLoad: number;
};

export default function WeightCapacity({ load, maxLoad }: WeightCapacityProps) {
  const weightPercentage = (load / maxLoad) * 100;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Weight className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Weight Capacity</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-bold">{load}</span>
          <span className="text-muted-foreground">/ {maxLoad} kg</span>
        </div>
        <Progress value={weightPercentage} className="h-3" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current Load</span>
          <span className="font-medium">
            {weightPercentage.toFixed(1)}% utilized
          </span>
        </div>
      </div>
    </div>
  );
}
