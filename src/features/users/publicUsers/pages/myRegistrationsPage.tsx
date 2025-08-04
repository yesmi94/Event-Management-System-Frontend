import { useEffect, useState } from "react";
import { getRegistrationsForUser } from "../services/publicUserService";
import EventRegistrationCard from "@/features/events/components/registrationsCard";
import { format } from "date-fns";
import { cancelEventRegistration } from "@/features/events/services/eventService";
import { toast } from "react-toastify";
import type { UserEventRegistrationData } from "../../types/types";
import { Calendar } from "lucide-react";

const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState<
    UserEventRegistrationData[]
  >([]);
  const [isVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRegistrationsForUser();
        setRegistrations(response.data);
        console.log("Raw Registrations data:", response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      if (!id) return;
      await cancelEventRegistration(id);
      toast.success("Registration cancelled successfully");
      setRegistrations((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      toast.error("Failed to delete event");
      console.error("Registration cancellation failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black relative overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 pt-8 px-6 max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold pb-5 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            My Registrations
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Manage your event registrations and keep track of your upcoming adventures
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pb-20">
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {registrations.length === 0 ? (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                No registrations yet
              </h3>
              <p className="text-gray-400 mb-6">
                You haven't registered for any events yet. Explore our events and find your next adventure!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
              {registrations.map((registration: any, index) => (
                <div
                  key={registration.id}
                  className="opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <EventRegistrationCard
                    eventImageUrl={registration.event.eventImageUrl}
                    userName={registration.registeredUserName}
                    email={registration.email}
                    phoneNumber={registration.phoneNumber}
                    eventName={registration.event.title}
                    eventDate={format(new Date(registration.event.eventDate), "PPP")}
                    eventTime={registration.event.eventTime}
                    onCancel={() => handleCancel(registration.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
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

export default MyRegistrationsPage;
