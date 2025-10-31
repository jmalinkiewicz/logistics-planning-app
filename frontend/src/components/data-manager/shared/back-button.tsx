import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button"; // or any button component you use
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  const segments = path.split("/").filter(Boolean);

  if (segments.length <= 1) return <div></div>;

  const parentPath = "/" + segments.slice(0, -1).join("/");

  return (
    <Button
      onClick={() => navigate(parentPath)}
      size={"icon"}
      variant={"outline"}
    >
      <ChevronLeft />
    </Button>
  );
}
