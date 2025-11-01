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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createParcel } from "@/data/parcels";
import type { ParcelRequest } from "@/definitions";

export default function CreateParcelDialog() {
  const [loading, setLoading] = useState(false);
  const [originOpen, setOriginOpen] = useState(false);
  const [origin, setOrigin] = useState<
    { city: string; id: number } | undefined
  >(undefined);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [destination, setDestination] = useState<
    { city: string; id: number } | undefined
  >(undefined);
  const [weightKg, setWeightKg] = useState("");
  const [widthM, setWidthM] = useState("");
  const [heightM, setHeightM] = useState("");
  const [depthM, setDepthM] = useState("");

  const { dismiss } = useDismissModal();
  const { locations, revalidate } = useData();

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
      await revalidate(["/parcels"]);
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
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter weight in kg"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Dimensions (meters)</Label>
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
