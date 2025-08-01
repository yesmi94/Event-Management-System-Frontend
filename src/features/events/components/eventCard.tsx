// src/components/events/EventCard.tsx

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { useRole } from "@/shared/hooks/useRole";
import type { EventCardProps } from "../types/types";
import { useCurrentEventPage } from "@/shared/hooks/useCurrentPage";

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  eventDate,
  eventTime,
  location,
  cutoffDate,
  eventImageUrl,
  onAction,
  onViewDetails,
}) => {
  const { hasRole } = useRole()
  const { isUpdatePage, isDeletePage, isBrowsePage } = useCurrentEventPage();

  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-3 rounded-lg backdrop-blur-md bg-white/20">
      <CardHeader className="p-0">
        <div className="h-48 w-full bg-gray-200 overflow-hidden">
          <img
            src={eventImageUrl || "/placeholder.png"}
            alt="Event"
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="pb-1">
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        <div className="text-sm text-muted-foreground mt-2 flex flex-col gap-1">
          <span className="flex items-center gap-2 text-white">
            <CalendarIcon size={16} /> {format(new Date(eventDate), "PPP")}
          </span>
          <span className="flex items-center gap-2 text-white">
            <ClockIcon size={16} /> {eventTime}
          </span>
          <span className="flex items-center gap-2 text-white">
            <MapPinIcon size={16} /> {location}
          </span>
            <span className="flex items-center gap-2 text-white">
              <CalendarIcon size={16} /> Registration ends: {format(new Date(cutoffDate), "PPP")}
            </span>

        </div>
      </CardContent>
      <CardFooter className="flex flex-col p-4 pt-2">
        <Button className="w-full" onClick={() => onViewDetails(id)}>
          View Details
        </Button>

          {hasRole("public_user") && isBrowsePage && (
          <div className="pt-6">
              <Button className="text-white bg-primary hover:bg-primary/90 px-6 py-2">
              Register Now
              </Button>
          </div>
          )}
          {isUpdatePage && (
          <div className="pt-6">
              <Button className="text-white bg-primary hover:bg-primary/90 px-6 py-2" onClick={() => onAction(id)}>
              Update the Event
              </Button>
          </div>
          )}
          {isDeletePage && (
          <div className="pt-6">
              <Button className="text-white bg-primary hover:bg-primary/90 px-6 py-2" onClick={() => onAction(id)}>
              Delete the Event
              </Button>
          </div>
          )}
      </CardFooter>
    </Card>
  );
};
