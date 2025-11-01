import { useData } from "@/providers/data-provider";
import { useParams } from "react-router";
import TransitsList from "../transits/transits-list";
import ParcelsList from "../parcels/parcels-list";

export default function Location() {
  const { id } = useParams();
  const data = useData();

  const location = data.locations.filter(
    (location) => location.id === Number(id)
  )[0];

  if (!location) {
    return <div>Loading location...</div>;
  }

  const transits = data.transits.filter(
    (transit) =>
      transit.startLocation.id === Number(id) ||
      transit.endLocation.id === Number(id)
  );

  const parcels = data.parcels.filter(
    (parcel) =>
      parcel.startLocation.id === Number(id) ||
      parcel.endLocation.id === Number(id)
  );

  return (
    <div>
      <div>
        <div className="flex gap-3">
          <h2 className="text-3xl font-bold capitalize">{location.city}</h2>
        </div>
        <div className="mt-8">
          <TransitsList transits={transits} />
        </div>
        <div className="mt-8">
          <ParcelsList parcels={parcels} />
        </div>
      </div>
    </div>
  );
}
