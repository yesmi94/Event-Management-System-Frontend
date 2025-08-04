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
    <div className="px-40 pb-30 bg-black pt-30">
      {eventData ? (
        <UpdateEventForm
          event={eventData}
          onSubmit={handleUpdate}
          onFileChange={handleFileChange}
        />
      ) : (
        <p className="text-center">Loading event details...</p>
      )}
    </div>
  );
};
