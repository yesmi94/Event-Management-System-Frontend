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
      // Step 1: Create the event
      const response = await createEvent(data);
      console.log(response);
      const eventId = response.data?.id;
      console.log(eventId);

      if (!eventId){
        toast.error("Failed to create the event");
        throw new Error("No event ID returned from event creation");
      } 

      // Step 2: Upload the image *after* event is created
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await uploadEventImage(eventId, formData);
        console.log("Image uploaded:", uploadResponse.data.imageUrl);
        toast.success("Event created successfully");
      }

      navigate(`/events/${eventId}`);
    } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred.';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{
        message: string;
        errors: string[];
      }>;

      const backendMessage = axiosError.response?.data?.errors?.[0];
      const fallbackMessage = axiosError.response?.data?.message;

      errorMessage = backendMessage || fallbackMessage || axiosError.message;
    }

    toast.error(errorMessage.replace(/^Failed:\s*/i, ''));
  }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center pb-20 px-90"
      style={{ backgroundImage: "url('/add-event-background.jpg')" }}
    >
      <h1 className="font-bold text-center mb-10 text-gray-300 pt-20">
        Create and share an unforgettable event ...
      </h1>
      <Card className="backdrop-blur-md bg-white/30">
        <CardHeader>
          <CardTitle className="text-2xl"></CardTitle>
        </CardHeader>
        <CardContent>
          <AddEventForm onSubmit={handleAddEvent} onFileChange={setFile} />
        </CardContent>
      </Card>
    </div>
  );
}


