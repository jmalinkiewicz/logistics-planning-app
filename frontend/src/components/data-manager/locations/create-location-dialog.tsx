import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { createLocation } from "@/data/locations";
import { useDismissModal } from "@/lib/utils";
import { useData } from "@/providers/data-provider";
import { useState, type FormEvent } from "react";

export default function CreateLocationDialog() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const { dismiss } = useDismissModal();
  const { revalidate } = useData();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const res = await createLocation(city);
    if (res.ok) {
      await revalidate(["/locations"]);
      dismiss();
    } else {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Create location</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-2">
          <div className="grid gap-3">
            <Label htmlFor="city">City</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id="city"
              placeholder="New York"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={loading} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!city} className="min-w-20" type="submit">
            {loading ? <Spinner /> : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
