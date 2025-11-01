import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Location } from "@/definitions";
import { useData } from "@/providers/data-provider";
import { useNavigate } from "react-router";

export default function LocationsList({
  locations,
}: {
  locations: Location[];
}) {
  const navigate = useNavigate();
  const data = useData();

  const getTransitsCount = (id: number) =>
    data.transits.filter(
      (transit) =>
        transit.startLocation.id === id || transit.endLocation.id === id
    );

  const getParcelsCount = (id: number) =>
    data.parcels.filter(
      (parcel) => parcel.startLocation.id === id || parcel.endLocation.id === id
    );

  return (
    <Table className="w-full">
      <TableCaption>A list of all locations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto pr-8">City</TableHead>
          <TableHead className="w-auto text-right">Location ID</TableHead>
          <TableHead className="w-auto text-right px-8">
            Parcels Count
          </TableHead>
          <TableHead className="w-auto text-right px-8">
            Transits Count
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((location) => (
          <TableRow
            className="capitalize"
            onClick={() => navigate(`/locations/${location.id}`)}
            key={location.id}
          >
            <TableCell className="w-auto pr-8">{location.city}</TableCell>
            <TableCell className="font-medium w-auto text-right">
              {location.id}
            </TableCell>
            <TableCell className="w-auto text-right px-8">
              {getParcelsCount(location.id).length}
            </TableCell>
            <TableCell className="w-auto text-right px-8">
              {getTransitsCount(location.id).length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
