import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { RefreshCcw, Trash2 } from "lucide-react";
import { Outlet, useLocation } from "react-router";
import BackButton from "../shared/back-button";

export default function TransitsLayout() {
  const location = useLocation();

  const isTransitView = /^\/transits\/\d+/.test(location.pathname);

  return (
    <>
      <div className="flex justify-between mb-6">
        <BackButton />
        <ButtonGroup>
          {isTransitView ? (
            <Button size="icon" variant="outline">
              <Trash2 className="text-red-600" />
            </Button>
          ) : (
            <Button size="icon" variant="outline">
              <RefreshCcw />
            </Button>
          )}
          <Button variant={"outline"}>New Transit</Button>
        </ButtonGroup>
      </div>
      <Outlet />
    </>
  );
}
