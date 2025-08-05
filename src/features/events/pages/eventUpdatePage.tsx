import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { UpdateEventForm } from "../components/updateEventForm";
import {
  updateEvent,
  uploadEventImage,
  getEventById,
} from "../services/eventService";
import type { EventFormData } from "../types/types";

export const EventUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<EventFormData | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) {
      toast.error("Event ID is missing from the URL.");
      return;
    }

    const fetchEvent = async () => {
      getEventById(id)
        .then((response) => {
          setEventData(response.data);
          console.log("Raw events data:", response.data);
        })
        .catch(console.error);
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (updatedEvent: EventFormData) => {
    if (!id) {
      toast.error("Missing event ID.");
      return;
    }

    try {
      const response = await updateEvent(id, updatedEvent);
      const updatedId = response?.data?.id || id;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadResponse = await uploadEventImage(updatedId, formData);
        console.log("Image uploaded:", uploadResponse.data.imageUrl);
      }

      toast.success("Event updated successfully!");
      navigate(`/events/${updatedId}`);
    } catch (error) {
      console.error("Error updating event", error);
      toast.error("Failed to update the event.");
    }
  };

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 pb-8 sm:pb-12 md:pb-20 lg:pb-30 bg-black pt-8 sm:pt-12 md:pt-20 lg:pt-30 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {eventData ? (
          <UpdateEventForm
            event={eventData}
            onSubmit={handleUpdate}
            onFileChange={handleFileChange}
          />
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-center text-white text-lg">Loading event details...</p>
          </div>
        )}
      </div>
    </div>
  );
};
