import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

type ScheduleProps = {
  departureDate: string;
  arrivalDate: string;
};

export default function Schedule({
  departureDate,
  arrivalDate,
}: ScheduleProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Schedule</h2>
      </div>
      <div className="flex justify-between mt-3">
        <div>
          <h5 className="text-neutral-500 text-sm">Departure</h5>
          <h4 className="text-xl font-medium capitalize">
            {formatDate(departureDate, true)}
          </h4>
        </div>
        <div>
          <h5 className="text-neutral-500 text-sm">Arrival</h5>
          <h4 className="text-xl font-medium capitalize">
            {formatDate(arrivalDate, true)}
          </h4>
        </div>
      </div>
    </div>
  );
}
