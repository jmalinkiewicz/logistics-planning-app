import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { useData } from "@/providers/data-provider";
import { useParams } from "react-router";
import RouteInformation from "../shared/route-information";
import Assignment from "./assignment";
import Dimensions from "../shared/dimensions";
import Weight from "./weight";

export default function Parcel() {
  const { id } = useParams();
  const data = useData();

  const parcel = data.parcels.filter((parcel) => parcel.id === Number(id))[0];

  if (!parcel) {
    return <div>Loading Parcel...</div>;
  }

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="flex gap-3">
            <h2 className="text-3xl font-bold">Parcel No. {parcel.id}</h2>{" "}
            <Badge
              className="capitalize font-semibold text-sm"
              variant={"outline"}
            >
              {parcel.status}
            </Badge>
          </div>
          <span className="text-muted-foreground text-sm">
            Created {formatDate(parcel.createdAt, true)}
          </span>
        </div>
        <div className="mt-8">
          <RouteInformation
            startLocation={parcel.startLocation}
            endLocation={parcel.endLocation}
          />
        </div>
        <div className="mt-8">
          <Assignment transitId={parcel.transitId} />
        </div>
        <div className="mt-8">
          <Dimensions
            name="Parcel"
            height={parcel.heightM}
            width={parcel.widthM}
            depth={parcel.depthM}
          />
        </div>
        <div className="mt-8">
          <Weight weight={parcel.weightKg} />
        </div>
      </div>
    </div>
  );
}
