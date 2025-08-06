import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddEventForm } from "../components/createEventForm";
import type { EventFormData } from "../types/types";
import { createEvent, uploadEventImage } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import axios from "axios";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [imageFile, setFile] = useState<File | null>(null);

  const handleAddEvent = async (data: EventFormData) => {
    try {
      const response = await createEvent(data);
      const eventId = response.data?.id;

      if (!eventId) {
        toast.error("Failed to create the event");
        throw new Error("No event ID returned from event creation");
      }

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await uploadEventImage(eventId, formData);
        toast.success("Event created successfully");
      }

      navigate(`/events/${eventId}`);
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
    <div
      className="flex flex-col min-h-screen bg-cover bg-center pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-90"
      style={{ backgroundImage: "url('/add-event-background.jpg')" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <h1 className="font-bold text-center mb-6 sm:mb-8 md:mb-10 text-gray-300 pt-8 sm:pt-12 md:pt-16 lg:pt-20 text-lg sm:text-xl md:text-2xl lg:text-3xl px-4">
          Create and share an unforgettable event ...
        </h1>

        <Card className="backdrop-blur-md bg-white/30 w-full shadow-lg">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl text-center text-gray-800"></CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 md:px-8">
            <AddEventForm onSubmit={handleAddEvent} onFileChange={setFile} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
