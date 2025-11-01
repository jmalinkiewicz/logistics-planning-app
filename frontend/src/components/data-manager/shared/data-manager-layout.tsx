import { ButtonGroup } from "@/components/ui/button-group";
import BackButton from "./back-button";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Trash2 } from "lucide-react";
import { Outlet, useLocation } from "react-router";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function DataManagerLayout({
  label,
  dialog,
}: {
  label: string;
  dialog: React.JSX.Element;
}) {
  const location = useLocation();

  const isDetailsView = /^\/(transits|parcels|locations)\/[^/]+/.test(
    location.pathname
  );

  return (
    <>
      <div className="flex justify-between mb-6">
        <BackButton />
        <ButtonGroup>
          {isDetailsView ? (
            <Button size="icon" variant="outline">
              <Trash2 className="text-red-600" />
            </Button>
          ) : (
            <Button size="icon" variant="outline">
              <RefreshCcw />
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>{label}</Button>
            </DialogTrigger>
            {dialog}
          </Dialog>
        </ButtonGroup>
      </div>
      <Outlet />
    </>
  );
}
