import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const segments = path.split("/").filter(Boolean);
  if (segments.length <= 1) return <div></div>;

  return (
    <Button onClick={() => navigate(-1)} size={"icon"} variant={"outline"}>
      <ChevronLeft />
    </Button>
  );
}
