// src/pages/events/EventDetailsPage.tsx

"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRole } from "@/shared/hooks/useRole";
import { getEventById, RegisterForEvent } from "../services/eventService";
import type { EventDetails } from "../types/types";
import { RegisterForEventDialog } from "../components/registerForEventDialog";
import { toast } from "react-toastify";
import type { UserEventRegistrationData } from "@/features/users/types/types";
import type { AxiosError } from "axios";
import axios from "axios";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const { hasRole } = useRole();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getEventById(id)
      .then((response) => {
        setEvent(response.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <svg
          className="animate-spin h-10 w-10 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );

  if (!event) return <div className="text-center p-10">Event not found.</div>;

  const eventDateFormatted = format(event.eventDate, "PPP");
  const eventTimeFormatted = event.eventTime;
  const today = new Date();
  const isRegistrationClosed = new Date(event.cutoffDate) < today;

  const attendeesLabel = event.capacity === 1 ? "Attendee" : "Attendees";

  const handleRegistration = async (data: UserEventRegistrationData) => {
    try {
      if (!id) return;
      data.eventId = id;
      const response = await RegisterForEvent(data);
      const eventId = response.data?.eventId;
      data.id = response.id;

      if (!eventId) {
        toast.error("Failed to register for the event");
        throw new Error("No event ID returned from registration");
      }

      toast.success("Successfully registered!");
      navigate("/registrations");
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred.";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          message: string;
          errors: string[];
        }>;

        const backendMessage = axiosError.response?.data?.errors?.[0];
        const fallbackMessage = axiosError.response?.data?.message;

        errorMessage = backendMessage || fallbackMessage || axiosError.message;
      }

      toast.error(errorMessage.replace(/^Failed:\s*/i, ""));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[70vh]">
        <img
          src={event.eventImageUrl || "/placeholder.png"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex items-end px-6 py-10">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="w-full px-4 md:px-10 py-10 space-y-8 bg-black flex flex-col">
        <div className="flex flex-wrap gap-6 text-gray-700 text-sm">
          <div className="flex items-center gap-2 text-white">
            <CalendarIcon size={18} />
            {eventDateFormatted}
          </div>
          <div className="flex items-center gap-2 text-red-400">
            <CalendarIcon size={18} />
            {format(event.cutoffDate, "PPP")}
          </div>
          <div className="flex items-center gap-2 text-white">
            <ClockIcon size={18} />
            {eventTimeFormatted}
          </div>
          <div className="flex items-center gap-2 text-white">
            <MapPinIcon size={18} />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-white">
            <UsersIcon size={18} />
            {event.capacity} {attendeesLabel}
          </div>
          <Badge variant="outline" className="text-sm capitalize text-white">
            {event.type}
          </Badge>
        </div>

        <hr className="border-gray-700" />

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-white">
            About the Event
          </h2>
          <p className="text-white leading-relaxed text-base">
            {event.description}
          </p>
        </div>

        <hr className="border-gray-700" />

        <div>
          <h3 className="text-lg font-medium text-white mb-1">Organized by</h3>
          <p className="text-white font-semibold">{event.organization}</p>
        </div>

        {hasRole("Public User") && !isRegistrationClosed && (
          <div className="pt-6">
            <Button
              className="text-black bg-white hover:bg-primary/90 hover:text-white px-6 py-2"
              onClick={() => setIsDialogOpen(true)}
            >
              Register Now
            </Button>
          </div>
        )}
        {hasRole("Public User") && isRegistrationClosed && (
          <div className="pt-6">
            <Button
              className="text-black bg-white hover:bg-primary/90 hover:text-white px-6 py-2"
              disabled={true}
            >
              Register Now
            </Button>
            <div className="text-lg text-red-400 font-medium text-center">
              Registration Closed
            </div>
          </div>
        )}
        <RegisterForEventDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleRegistration}
        />
      </div>
    </div>
  );
}
