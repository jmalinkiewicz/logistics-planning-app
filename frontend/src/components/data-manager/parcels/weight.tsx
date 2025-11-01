import { WeightIcon } from "lucide-react";

type WeightProps = {
  weight: number;
};

export default function Weight({ weight }: WeightProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <WeightIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Weight</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Weight</p>
          <p className="text-2xl font-bold">
            {weight}
            <span className="text-base font-normal text-muted-foreground ml-1">
              kg
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
