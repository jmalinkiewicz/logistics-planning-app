import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Parcel } from "@/definitions";
import { useNavigate } from "react-router";

export default function ParcelsList({ parcels }: { parcels: Parcel[] }) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableCaption>A list of all parcels.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Parcel No.</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className="text-right">
            Volume (m<sup>3</sup>)
          </TableHead>
          <TableHead className="text-right">Weight (kg)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parcels.map((parcel) => (
          <TableRow
            className="capitalize"
            onClick={() => navigate(`/parcels/${parcel.id}`)}
            key={parcel.id}
          >
            <TableCell className="font-medium">{parcel.id}</TableCell>
            <TableCell>{parcel.status}</TableCell>
            <TableCell>{parcel.startLocation.city}</TableCell>
            <TableCell>{parcel.endLocation.city}</TableCell>
            <TableCell className="text-right">
              {parcel.volumeM3.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              {parcel.weightKg.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
