import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type DatesProps = {
  departureDateOpen: boolean;
  setDepartureDateOpen: Dispatch<SetStateAction<boolean>>;
  arrivalDateOpen: boolean;
  setArrivalDateOpen: Dispatch<SetStateAction<boolean>>;
  departureDate: Date | undefined;
  setDepartureDate: Dispatch<SetStateAction<Date | undefined>>;
  arrivalDate: Date | undefined;
  setArrivalDate: Dispatch<SetStateAction<Date | undefined>>;
  departureTime: string;
  setDepartureTime: Dispatch<SetStateAction<string>>;
  arrivalTime: string;
  setArrivalTime: Dispatch<SetStateAction<string>>;
};

export default function Dates({
  departureDateOpen,
  setDepartureDateOpen,
  departureDate,
  setDepartureDate,
  arrivalDateOpen,
  setArrivalDateOpen,
  arrivalDate,
  setArrivalDate,
  departureTime,
  setDepartureTime,
  arrivalTime,
  setArrivalTime,
}: DatesProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="departureDate">Departure Date & Time</Label>
        <div className="flex gap-2">
          <Popover open={departureDateOpen} onOpenChange={setDepartureDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex-1 justify-start text-left font-normal bg-transparent",
                  !departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : "Pick a date"}
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
    </>
  );
}
