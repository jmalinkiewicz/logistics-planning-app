import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Location } from "@/definitions";
import { cn } from "@/lib/utils";
import { useData } from "@/providers/data-provider";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type RouteProps = {
  originOpen: boolean;
  setOriginOpen: Dispatch<SetStateAction<boolean>>;
  destinationOpen: boolean;
  setDestinationOpen: Dispatch<SetStateAction<boolean>>;
  origin: Location | undefined;
  setOrigin: Dispatch<SetStateAction<Location | undefined>>;
  destination: Location | undefined;
  setDestination: Dispatch<SetStateAction<Location | undefined>>;
};

export default function Route({
  originOpen,
  destinationOpen,
  setOriginOpen,
  setDestinationOpen,
  origin,
  destination,
  setOrigin,
  setDestination,
}: RouteProps) {
  const { locations } = useData();

  return (
    <>
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
              <CommandInput placeholder="Search location..." className="h-9" />
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
                          origin?.id === loc.id ? "opacity-100" : "opacity-0"
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
              <CommandInput placeholder="Search location..." className="h-9" />
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
    </>
  );
}
