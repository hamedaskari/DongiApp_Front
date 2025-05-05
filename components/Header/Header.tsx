import { FaUser } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import Notifications from "./Notifications";

export default function Header() {
  return (
    <header className="bg-blue-950 w-full h-15 flex justify-between items-center p-3">
      <div className="flex justify-between gap-3.5">
        {/* user icon */}
        <FaUser className="cursor-pointer" color="white" />

        {/* Notification icon with count badge */}
        <Notifications />
      </div>
      <div>
        <MenuItem />
      </div>
    </header>
  );
}
