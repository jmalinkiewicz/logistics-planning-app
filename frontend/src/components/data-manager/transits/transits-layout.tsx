import DataManagerLayout from "../shared/data-manager-layout";
import CreateTransitDialog from "./create-transit-dialog";

export default function TransitsLayout() {
  return (
    <>
      <DataManagerLayout dialog={<CreateTransitDialog />} label="New Transit" />
    </>
  );
}
