import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transit } from "@/definitions";
import { formatDate } from "@/lib/utils";

export default function TransitsList({ transits }: { transits: Transit[] }) {
  return (
    <Table>
      <TableCaption>A list of all tranits.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Transit No.</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className="text-right">
            Volume (m<sup>3</sup>)
          </TableHead>
          <TableHead className="text-right">Departs</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transits.map((transit) => (
          <TableRow key={transit.id}>
            <TableCell className="font-medium">{transit.id}</TableCell>
            <TableCell>{transit.status}</TableCell>
            <TableCell>{transit.startLocation.city}</TableCell>
            <TableCell>{transit.endLocation.city}</TableCell>
            <TableCell className="text-right">
              {transit.currentVolumeM3}
            </TableCell>
            <TableCell className="text-right">
              {formatDate(transit.departureDate)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
