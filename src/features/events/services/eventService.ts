import api from "@/shared/config/api"
import type { EventFormData, EventTypeOption } from "../types/types"
import type { UserEventRegistrationData } from "@/features/users/types/types"


export const getEvents = async (page: number, pageSize: number) => {
  const res = await api.get("/events", {
    params: {
      page,
      pageSize
    }
  })
  return res.data
}

export const getEventById = async (id: string) => {
  const res = await api.get(`/events/${id}`)
  return res.data
}

export const updateEvent = async (id: string, event: EventFormData) => {
  const res = await api.put(`/events/${id}`, { updateEventDto: event });
  return res.data;
}


export const deleteEvent = async (id: string) => {
  const res = await api.delete(`/events/${id}`)
  return res.data
}

export const createEvent = async (event: EventFormData) => {
  const payload = {
    newEventDto: event
  };
  const res = await api.post("/events", payload)
  return res.data
}

export const uploadEventImage = (eventId: string, formData: FormData) => {
  return api.post(`/events/${eventId}/upload-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const getEventImage = async (id: string) => {
  const res = await api.get(`/events/${id}/event-image`)
  return res.data
}

export const getRegistrationsForEvent = async (id: string) => {
  const res = await api.get(`/events/${id}/registrations`)
  return res.data
}

export const getEventTypes = async (): Promise<EventTypeOption[]> => {
  const res = await api.get("/events/event-types");
  return res.data.value;
};

export const RegisterForEvent = async (data: UserEventRegistrationData) => {
  const payload = {
    newRegistrationDto: data
  };
  const res = await api.post("/registrations", payload)
  return res.data
}

export const cancelEventRegistration = async (id: string) => {
  const res = await api.delete(`registrations/${id}`)
  return res.data
}
