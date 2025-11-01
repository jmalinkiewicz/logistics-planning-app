import { useData } from "@/providers/data-provider";
import { useParams } from "react-router";
import RouteInformation from "../shared/route-information";
import { Badge } from "@/components/ui/badge";
import Schedule from "./schedule";
import WeightCapacity from "./weight-capacity";
import VolumeCapacity from "./volume-capacity";
import Dimensions from "../shared/dimensions";
import { formatDate } from "@/lib/utils";

export default function Transit() {
  const { id } = useParams();
  const data = useData();

  const transit = data.transits.filter(
    (transit) => transit.id === Number(id)
  )[0];

  if (!transit) {
    return <div>Loading transit...</div>;
  }

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="flex gap-3">
            <h2 className="text-3xl font-bold">Transit No. {transit.id}</h2>{" "}
            <Badge
              className="capitalize font-semibold text-sm"
              variant={"outline"}
            >
              {transit.status}
            </Badge>
          </div>
          <span className="text-muted-foreground text-sm">
            Created {formatDate(transit.createdAt, true)}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <RouteInformation
          startLocation={transit.startLocation}
          endLocation={transit.endLocation}
        />
      </div>
      <div className="mt-8">
        <Schedule
          departureDate={transit.departureDate}
          arrivalDate={transit.departureDate}
        />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <WeightCapacity
          load={transit.currentLoadKg}
          maxLoad={transit.maxLoadKg}
        />
        <VolumeCapacity
          volume={transit.currentVolumeM3}
          maxVolume={transit.maxVolumeM3}
        />
      </div>
      <div className="mt-8">
        <Dimensions
          name="Container"
          height={transit.heightM}
          width={transit.widthM}
          depth={transit.depthM}
        />
      </div>
    </div>
  );
}
