import { Outlet } from "react-router";
import TransitsList from "./transits-list";
import { useData } from "@/providers/data-provider";

export default function Transits() {
  const data = useData();

  return (
    <>
      <h2>Transits</h2>
      <TransitsList transits={data.transits} />
    </>
  );
}
