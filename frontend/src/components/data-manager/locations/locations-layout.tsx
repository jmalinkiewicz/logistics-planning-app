import DataManagerLayout from "../shared/data-manager-layout";
import CreateLocationDialog from "./create-location-dialog";

export default function LocationsLayout() {
  return (
    <>
      <DataManagerLayout
        dialog={<CreateLocationDialog />}
        label="New Location"
      />
    </>
  );
}
