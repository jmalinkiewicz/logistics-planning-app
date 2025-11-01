"use client";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { TransitRequest } from "@/definitions";
import { createTransit } from "@/data/transits";

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
  const { locations, revalidate } = useData();

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
      await revalidate(["/transits"]);
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
          <div className="grid gap-2">
            <Label htmlFor="origin">Origin Location</Label>
            <Popover open={originOpen} onOpenChange={setOriginOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={originOpen}
                  className="w-full justify-between bg-transparent"
                >
                  {origin ? origin.city : "Select origin..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[375px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search location..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((loc) => (
                        <CommandItem
                          key={loc.id}
                          value={loc.city}
                          onSelect={() => {
                            setOrigin(loc);
                            setOriginOpen(false);
                          }}
                        >
                          {loc.city}
                          <Check
                            className={cn(
                              "ml-auto",
                              origin?.id === loc.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="destination">Destination Location</Label>
            <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={destinationOpen}
                  className="w-full justify-between bg-transparent"
                >
                  {destination ? destination.city : "Select destination..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[375px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search location..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((loc) => (
                        <CommandItem
                          key={loc.id}
                          value={loc.city}
                          onSelect={() => {
                            setDestination(loc);
                            setDestinationOpen(false);
                          }}
                        >
                          {loc.city}
                          <Check
                            className={cn(
                              "ml-auto",
                              destination?.id === loc.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="maxLoad">Max Load (kg)</Label>
            <Input
              id="maxLoad"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter max load in kg"
              value={maxLoadKg}
              onChange={(e) => setMaxLoadKg(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Cargo Space Dimensions (meters)</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="grid gap-2">
                <Label
                  htmlFor="width"
                  className="text-xs text-muted-foreground"
                >
                  Width
                </Label>
                <Input
                  id="width"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Width"
                  value={widthM}
                  onChange={(e) => setWidthM(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="height"
                  className="text-xs text-muted-foreground"
                >
                  Height
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Height"
                  value={heightM}
                  onChange={(e) => setHeightM(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="depth"
                  className="text-xs text-muted-foreground"
                >
                  Depth
                </Label>
                <Input
                  id="depth"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Depth"
                  value={depthM}
                  onChange={(e) => setDepthM(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="departureDate">Departure Date & Time</Label>
            <div className="flex gap-2">
              <Popover
                open={departureDateOpen}
                onOpenChange={setDepartureDateOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal bg-transparent",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate
                      ? format(departureDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={(date) => {
                      setDepartureDate(date);
                      setDepartureDateOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-32"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="arrivalDate">Arrival Date & Time</Label>
            <div className="flex gap-2">
              <Popover open={arrivalDateOpen} onOpenChange={setArrivalDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal bg-transparent",
                      !arrivalDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {arrivalDate ? format(arrivalDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={arrivalDate}
                    onSelect={(date) => {
                      setArrivalDate(date);
                      setArrivalDateOpen(false);
                    }}
                    initialFocus
                    disabled={(date) =>
                      departureDate ? date < departureDate : false
                    }
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-32"
              />
            </div>
          </div>
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
