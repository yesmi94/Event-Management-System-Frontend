import { useEffect, useState } from "react";
import { getRegistrationsForEvent } from "../services/eventService";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserEventRegistrationData } from "@/features/users/types/types";
import { useParams } from "react-router-dom";

const EventRegistrationsListPage = () => {
  const [filteredRegistrations, setFilteredRegistrations] = useState<UserEventRegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<UserEventRegistrationData[]>([]);
  const { eventId } = useParams();

  useEffect(() => {
    console.log("Event ID from URL:", eventId);
    if (eventId) {
      fetchRegistrations(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (Array.isArray(registrations)) {
      const filtered = registrations.filter((registration) =>
        registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.registeredUserName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRegistrations(filtered);
    }
  }, [registrations, searchTerm]);

  const fetchRegistrations = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRegistrationsForEvent(id);
      console.log("Raw response:", response);

      const items = response.data;
      console.log("Registrations extracted:", items);

      setRegistrations(items);
    } catch (err: any) {
      console.error("Error fetching registrations:", err?.response || err);
      setError("Failed to load registrations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (eventId) {
      fetchRegistrations(eventId);
    }
  };

  const EventSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-lg h-80 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black relative overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 pt-8 px-6 pb-12">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Event Registrations
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            View and manage users who have registered for this event.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/40">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
              <div>{filteredRegistrations.length} Registrations Found</div>
              {searchTerm && (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-green-400" />
                  <span>Filtered by: "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
              <p className="text-red-400 mb-3">{error}</p>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
              {[...Array(6)].map((_, index) => (
                <EventSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRegistrations.map((registration, index) => (
                  <div
                    key={registration.id}
                    className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow hover:shadow-lg transition-all animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="mb-2">
                      <h2 className="text-xl font-semibold text-white">{registration.registeredUserName}</h2>
                      <p className="text-sm text-gray-400">{registration.email}</p>
                      <p className="text-sm text-gray-400">{registration.phoneNumber}</p>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        <strong>Registration ID:</strong> {registration.id}
                      </p>
                      {registration.registeredAt && (
                        <p>
                          <strong>Registered At:</strong> {new Date(registration.registeredAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {!loading && filteredRegistrations.length > 0 && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{filteredRegistrations.length}</div>
                  <div className="text-gray-400">Registrations Available</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EventRegistrationsListPage;
