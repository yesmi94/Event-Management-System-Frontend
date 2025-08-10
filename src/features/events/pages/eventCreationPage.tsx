import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddEventForm } from "../components/createEventForm";
import type { EventFormData } from "../types/types";
import { createEvent, uploadEventImage } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import axios from "axios";
import { useBoolean } from "@/shared/hooks/useBoolean";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [imageFile, setFile] = useState<File | null>(null);
  const [isVisible, { setTrue }] = useBoolean();

  useEffect(() => {
    setTrue();
  }, []);

  const handleAddEvent = async (data: EventFormData) => {
    console.log("entered handling add event event:");
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

        await uploadEventImage(eventId, formData);
      }

      toast.success("Event created successfully");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Create Event
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Create and share an unforgettable event
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Card className="backdrop-blur-md bg-white/20 border-white/10 shadow-2xl shadow-purple-500/10 max-w-2xl mx-auto">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center text-white"></CardTitle>
            </CardHeader>
            <CardContent className="px-6 md:px-8">
              <AddEventForm onSubmit={handleAddEvent} onFileChange={setFile} />
            </CardContent>
          </Card>
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gray-500 text-sm">
            Need help? Check our documentation or contact support for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
