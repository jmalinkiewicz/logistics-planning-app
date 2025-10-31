import TransitsList from "./transits-list";
import { useData } from "@/providers/data-provider";

export default function Transits() {
  const data = useData();

  return (
    <>
      <TransitsList transits={data.transits} />
    </>
  );
}
