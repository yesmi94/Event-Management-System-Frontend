import { useEffect, useState } from "react";
import { getRegistrationsForUser } from "../services/publicUserService";
import EventRegistrationCard from "@/features/events/components/registrationsCard";
import { format } from "date-fns";
import { cancelEventRegistration } from "@/features/events/services/eventService";
import { toast } from "react-toastify";
import type { UserEventRegistrationData } from "../../types/types";


const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState<UserEventRegistrationData[]>([]);

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
    <div className="pt-23 px-6 pb-30 bg-black min-h-screen">
        <h1 className="text-lg font-bold text-center mb-3 text-white">Registrations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {registrations.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">You have no registrations yet</p>
            ) : (
                registrations.map((registration: any) => (
                <EventRegistrationCard
                    key={registration.id}
                    eventImageUrl={registration.event.eventImageUrl}
                    userName={registration.registeredUserName}
                    email={registration.email}
                    phoneNumber={registration.phoneNumber}
                    eventName={registration.event.title}
                    eventDate={format(new Date(registration.event.eventDate), "PPP")}
                    eventTime={registration.event.eventTime}
                    onCancel={() => handleCancel(registration.id)}
                />
                ))
            )}

        </div>
    </div>

  );
};

export default MyRegistrationsPage;
