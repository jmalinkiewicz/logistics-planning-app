import DataManagerLayout from "../shared/data-manager-layout";
import CreateParcelDialog from "./create-parcel-dialog";

export default function ParcelsLayout() {
  return (
    <>
      <DataManagerLayout dialog={<CreateParcelDialog />} label="New Parcel" />
    </>
  );
}
