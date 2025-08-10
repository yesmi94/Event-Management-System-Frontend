import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import { useKeycloak } from "@/shared/hooks/useKeycloak";

export default function AdminNavbar() {
  const { user } = useKeycloak();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full backdrop-blur-md bg-white/30 shadow px-4 sm:px-6 py-3 fixed top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold text-purple-300">
          Gatherly
        </div>

        <ul className="hidden md:flex lg:pl-30 space-x-6 lg:space-x-8 items-center">
          <li>
            <a href="/" className="text-white hover:text-gray-400 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/event-actions" className="text-white hover:text-gray-400 transition-colors">
              Event Actions
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-400 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="/profile" className="text-white hover:text-gray-400 transition-colors">
              Profile
            </a>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <div className="flex items-center space-x-2 p-2 text-white hover:text-gray-400 transition cursor-pointer">
              <span className="hidden lg:inline-block">{user?.email}</span>
              <User className="w-5 h-5" />
            </div>
          </Button>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-400">
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="text-purple-300 hover:text-gray-400"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <ul className="flex flex-col space-y-3">
            <li>
              <a 
                href="/" 
                className="block text-white hover:text-gray-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/event-actions" 
                className="block text-white hover:text-gray-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Event Actions
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="block text-white hover:text-gray-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/profile" 
                className="block text-white hover:text-gray-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </a>
            </li>
            {user?.email && (
              <li className="pt-2 border-t border-white/20">
                <span className="block text-white/80 text-sm py-2">
                  {user.email}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
