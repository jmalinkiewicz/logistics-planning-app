import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useDismissModal } from "@/lib/utils";
import { useData } from "@/providers/data-provider";
import { useState, type FormEvent } from "react";
import { createParcel } from "@/data/parcels";
import type { Location, ParcelRequest } from "@/definitions";
import Route from "../shared/form/route";
import Space from "../shared/form/space";

export default function CreateParcelDialog() {
  const [loading, setLoading] = useState(false);
  const [originOpen, setOriginOpen] = useState(false);
  const [origin, setOrigin] = useState<Location | undefined>(undefined);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [destination, setDestination] = useState<Location | undefined>(
    undefined
  );
  const [weightKg, setWeightKg] = useState("");
  const [widthM, setWidthM] = useState("");
  const [heightM, setHeightM] = useState("");
  const [depthM, setDepthM] = useState("");

  const { dismiss } = useDismissModal();
  const { revalidate } = useData();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!origin || !destination) return;

    const parcelRequest: ParcelRequest = {
      startLocationId: origin.id,
      endLocationId: destination.id,
      weightKg: Number.parseFloat(weightKg),
      widthM: Number.parseFloat(widthM),
      heightM: Number.parseFloat(heightM),
      depthM: Number.parseFloat(depthM),
    };

    setLoading(true);

    const res = await createParcel(parcelRequest);

    if (res.ok) {
      await revalidate(["/parcels", "/transits"]);
      setOrigin(undefined);
      setDestination(undefined);
      setWeightKg("");
      setWidthM("");
      setHeightM("");
      setDepthM("");
      setLoading(false);
      dismiss();
    }

    setLoading(false);
  };

  const isFormValid =
    origin &&
    destination &&
    weightKg &&
    widthM &&
    heightM &&
    depthM &&
    !isNaN(Number.parseFloat(weightKg)) &&
    !isNaN(Number.parseFloat(widthM)) &&
    !isNaN(Number.parseFloat(heightM)) &&
    !isNaN(Number.parseFloat(depthM));

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Create parcel</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-2">
          <Route
            originOpen={originOpen}
            setOriginOpen={setOriginOpen}
            destinationOpen={destinationOpen}
            setDestinationOpen={setDestinationOpen}
            origin={origin}
            destination={destination}
            setOrigin={setOrigin}
            setDestination={setDestination}
          />

          <Space
            weightKg={weightKg}
            setWeightKg={setWeightKg}
            heightM={heightM}
            setHeightM={setHeightM}
            widthM={widthM}
            setWidthM={setWidthM}
            depthM={depthM}
            setDepthM={setDepthM}
            label="Dimensions (meters)"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={loading} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="min-w-20"
            disabled={!isFormValid || loading}
            type="submit"
          >
            {loading ? <Spinner /> : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
