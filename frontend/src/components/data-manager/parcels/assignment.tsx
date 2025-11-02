import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { Link } from "react-router";

export default function Assignment({
  transitId,
}: {
  transitId: number | null;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5" />
        <h2 className="text-2xl font-semibold">Assignment</h2>
      </div>
      <div className="flex gap-8 mt-3">
        <div className="space-y-4">
          <div>
            <h5 className="text-neutral-500 text-sm">Transit ID</h5>
            {transitId ? (
              <h4 className="text-xl font-medium capitalize">#{transitId}</h4>
            ) : (
              <h4 className="text-xl font-medium capitalize">Not Assigned</h4>
            )}
          </div>
        </div>
        {transitId && (
          <div className="flex items-center">
            <Button variant={"outline"} asChild>
              <Link to={`/transits/${transitId}`}>View Transit</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
