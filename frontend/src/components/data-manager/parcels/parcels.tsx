import { useData } from "@/providers/data-provider";
import ParcelsList from "./parcels-list";

export default function Parcels() {
  const data = useData();

  return (
    <>
      <ParcelsList parcels={data.parcels} />
    </>
  );
}
