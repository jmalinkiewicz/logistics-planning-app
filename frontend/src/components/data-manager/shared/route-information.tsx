import type { Location } from "@/definitions";
import { MapPin, Truck } from "lucide-react";

type RouteInformationProps = {
  startLocation: Location;
  endLocation: Location;
};

export default function RouteInformation({
  startLocation,
  endLocation,
}: RouteInformationProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        <h2 className="text-2xl font-semibold">Route Information</h2>
      </div>
      <div className="flex justify-between mt-3">
        <div>
          <h5 className="text-neutral-500 text-sm">Origin</h5>
          <h4 className="text-xl font-medium capitalize">
            {startLocation.city}
          </h4>
        </div>
        <div className="flex flex-1 px-8 items-center justify-center">
          <div className="h-px w-full bg-border relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-neutral-500 text-sm">Destination</h5>
          <h4 className="text-xl font-medium capitalize">{endLocation.city}</h4>
        </div>
      </div>
    </div>
  );
}
