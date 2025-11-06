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
import { format } from "date-fns";
import type { TransitRequest } from "@/definitions";
import { createTransit } from "@/data/transits";
import Route from "../shared/form/route";
import Space from "../shared/form/space";
import Dates from "../shared/form/dates";

export default function CreateTransitDialog() {
  const [loading, setLoading] = useState(false);
  const [originOpen, setOriginOpen] = useState(false);
  const [origin, setOrigin] = useState<
    { city: string; id: number } | undefined
  >(undefined);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [destination, setDestination] = useState<
    { city: string; id: number } | undefined
  >(undefined);
  const [maxLoadKg, setMaxLoadKg] = useState("");
  const [widthM, setWidthM] = useState("");
  const [heightM, setHeightM] = useState("");
  const [depthM, setDepthM] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    undefined
  );
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
  const [departureTime, setDepartureTime] = useState("00:00");
  const [arrivalTime, setArrivalTime] = useState("00:00");
  const [departureDateOpen, setDepartureDateOpen] = useState(false);
  const [arrivalDateOpen, setArrivalDateOpen] = useState(false);

  const { dismiss } = useDismissModal();
  const { revalidate } = useData();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!origin || !destination || !departureDate || !arrivalDate) return;

    const departureDateTimeString = `${format(
      departureDate,
      "yyyy-MM-dd"
    )}T${departureTime}:00.000000`;
    const arrivalDateTimeString = `${format(
      arrivalDate,
      "yyyy-MM-dd"
    )}T${arrivalTime}:00.000000`;

    const transitRequest: TransitRequest = {
      startLocationId: origin.id,
      endLocationId: destination.id,
      widthM: Number.parseFloat(widthM),
      heightM: Number.parseFloat(heightM),
      depthM: Number.parseFloat(depthM),
      maxLoadKg: Number.parseFloat(maxLoadKg),
      departureDate: departureDateTimeString,
      arrivalDate: arrivalDateTimeString,
    };

    setLoading(true);

    const res = await createTransit(transitRequest);

    if (res.ok) {
      await revalidate(["/transits", "/parcels"]);
      setOrigin(undefined);
      setDestination(undefined);
      setDepartureDate(undefined);
      setArrivalDate(undefined);
      setMaxLoadKg("");
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
    maxLoadKg &&
    widthM &&
    heightM &&
    depthM &&
    departureDate &&
    arrivalDate &&
    !isNaN(Number.parseFloat(maxLoadKg)) &&
    !isNaN(Number.parseFloat(widthM)) &&
    !isNaN(Number.parseFloat(heightM)) &&
    !isNaN(Number.parseFloat(depthM));

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Create transit</DialogTitle>
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
            weightKg={maxLoadKg}
            setWeightKg={setMaxLoadKg}
            heightM={heightM}
            setHeightM={setHeightM}
            widthM={widthM}
            setWidthM={setWidthM}
            depthM={depthM}
            setDepthM={setDepthM}
            label="Cargo space dimensions (meters)"
          />

          <Dates
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            arrivalDate={arrivalDate}
            setArrivalDate={setArrivalDate}
            departureDateOpen={departureDateOpen}
            arrivalDateOpen={arrivalDateOpen}
            setDepartureDateOpen={setDepartureDateOpen}
            setArrivalDateOpen={setArrivalDateOpen}
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            setDepartureTime={setDepartureTime}
            setArrivalTime={setArrivalTime}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={loading} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-20"
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
