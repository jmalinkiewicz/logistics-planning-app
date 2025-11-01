import { useData } from "@/providers/data-provider";
import LocationsList from "./locations-list";

export default function Locations() {
  const data = useData();

  return (
    <>
      <LocationsList locations={data.locations} />
    </>
  );
}
