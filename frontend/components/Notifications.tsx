import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function NavbarNotification() {
  return (
    <Button
      data-sidebar="notifications"
      data-slot="sidebar-notifications"
      variant="ghost"
      size="icon"
      className={`${cn("size-7")} pt-[1px]`}
    >
      <Bell color="rgb(36, 35, 35)" size={15} />
    </Button>
  );
}
