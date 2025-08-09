import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  PhoneIcon,
  UserCircleIcon,
  Edit3,
  LogOut,
} from "lucide-react";
import { useKeycloak } from "@/shared/hooks/useKeycloak";

export default function ProfilePage() {
  const { user } = useKeycloak();
  const { logout } = useKeycloak();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const InfoItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    color?: string;
  }> = ({ icon, label, value, color = "text-blue-400" }) => (
    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className={`${color}`}>{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 pt-20 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Manage your account information and preferences
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div
              className={`bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="relative mb-6">
                {user?.profileImage ? (
                  <div className="relative">
                    <img
                      src={user.profileImage}
                      alt={`${user.name} Profile`}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400 mx-auto shadow-xl"
                    />
                    <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 mx-auto"></div>
                  </div>
                ) : (
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-4 border-white/20">
                    <UserCircleIcon className="w-20 h-20 text-white/60" />
                  </div>
                )}

                <div className="absolute bottom-2 right-1/2 transform translate-x-12">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white/20"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-8">
                {user?.name || "User Name"}
              </h2>

              <div className="space-y-4 mb-8">
                <InfoItem
                  icon={<MailIcon className="w-5 h-5" />}
                  label="Email Address"
                  value={user?.email || "user@example.com"}
                  color="text-blue-400"
                />
                <InfoItem
                  icon={<PhoneIcon className="w-5 h-5" />}
                  label="Phone Number"
                  value={user?.phone_number || "+1 (555) 123-4567"}
                  color="text-green-400"
                />
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="ghost" asChild>
                  <div
                    onClick={logout}
                    className="flex items-center text-red-500 hover:text-red-500 px-3 py-2 rounded cursor-pointer"
                  >
                    <LogOut className="mr-2 w-5 h-5" />
                    Logout
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
