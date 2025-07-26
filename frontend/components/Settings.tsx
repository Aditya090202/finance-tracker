import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function NavbarSettings() {
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7")}
    >
      <Settings color="rgb(36, 35, 35)" />
    </Button>
  );
}
