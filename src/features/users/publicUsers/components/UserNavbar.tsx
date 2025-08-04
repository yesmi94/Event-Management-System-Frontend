import { Button } from "@/components/ui/button";
import { useKeycloak } from "@/shared/hooks/useKeycloak";
import { User } from "lucide-react";

export default function UserNavbar() {
  const { user } = useKeycloak();
  
  return (
    <nav className="w-full backdrop-blur-md bg-white/30 shadow px-6 py-3 flex justify-between items-center fixed top-0 z-50">
      <div className="text-2xl font-bold text-purple-300">Gatherly</div>

      <ul className="flex space-x-15 items-center pl-30">
        <li>
          <a href="/" className="!text-white hover:!text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="/events" className="!text-white hover:!text-gray-400">
            Events
          </a>
        </li>
        <li>
          <a href="/registrations" className="!text-white hover:!text-gray-400">
            My Registrations
          </a>
        </li>
        <li>
          <a href="/profile" className="!text-white hover:!text-gray-400">
            Profile
          </a>
        </li>
      </ul>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <div className="flex items-center p-2 text-white hover:text-gray-600 transition cursor-pointer">
            <span>{user?.email}</span>
            <User className="w-5 h-5" />
          </div>
        </Button>
      </div>
    </nav>
  );
}
