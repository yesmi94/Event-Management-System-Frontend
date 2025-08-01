import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useKeycloak } from "@/shared/hooks/useKeycloak";
import { Link } from "react-router-dom";

export default function UserNavbar() {
  const { logout } = useKeycloak();

  return (
    <nav className="w-full backdrop-blur-md bg-white/30 shadow px-6 py-3 flex justify-between items-center fixed top-0 z-50">

      <div className="text-2xl font-bold text-purple-300">Gatherly</div>

      <ul className="flex space-x-15 items-center">
        <li><Link to="/" className="!text-white hover:!text-gray-400">Home</Link></li>
        <li><a href="/events" className="!text-white hover:!text-gray-400">Events</a></li>
        <li><a href="/registrations" className="!text-white hover:!text-gray-400">My Registrations</a></li>
        <li><a href="/profile" className="!text-white hover:!text-gray-400">Profile</a></li>
      </ul>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <div className="flex items-center p-2 text-white hover:text-gray-600 transition cursor-pointer">
            <User className="w-5 h-5" />
          </div>
        </Button>


        {/* Logout Button */}
        <Button variant="ghost" asChild>
          <div onClick={logout} className="flex items-center text-red-500 hover:text-red-500 px-3 py-2 rounded cursor-pointer">
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </div>
        </Button>
      </div>
    </nav>
  );
}