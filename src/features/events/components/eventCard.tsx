import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  onViewRegistrations,
}) => {
  const { hasRole } = useRole();
  const { isUpdatePage, isDeletePage, isBrowsePage } = useCurrentEventPage();
  const today = new Date();
  const isRegistrationClosed = new Date(cutoffDate) < today;


  return (
    <Card className="w-full pt-0 max-w-sm rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-0">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={eventImageUrl || "/placeholder.png"}
            alt="Event"
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
      </CardHeader>

      <CardContent className="px-4 py-3">
        <CardTitle className="text-lg font-semibold text-white mb-2">
          {title}
        </CardTitle>
        <ul className="text-sm text-white space-y-1">
          <li className="flex items-center gap-2">
            <CalendarIcon size={16} /> {format(new Date(eventDate), "PPP")}
          </li>
          <li className="flex items-center gap-2">
            <ClockIcon size={16} /> {eventTime}
          </li>
          <li className="flex items-center gap-2">
            <MapPinIcon size={16} /> {location}
          </li>
          <li className="flex items-center gap-2">
            <CalendarIcon size={16} /> Registration ends:{" "}
            {format(new Date(cutoffDate), "PPP")}
          </li>
        </ul>

        {isRegistrationClosed && (
          <div className="text-sm text-red-400 font-medium text-center">
            Registration Closed
          </div>
        )}

      </CardContent>

      <CardFooter className="flex flex-col gap-3 px-4 pb-4">
        <Button
          className="w-full bg-white text-black hover:bg-gray-100 transition font-medium"
          onClick={() => onViewDetails(id)}
        >
          View Details
        </Button>

        {hasRole("Admin") && isBrowsePage && (
          <Button
            className="w-full bg-gray-500 hover:bg-gray-800 text-white transition"
            onClick={() => onViewRegistrations(id)}
          >
            View Registrations
          </Button>
        )}

        {hasRole("public_user") && isBrowsePage && (
          <Button className="w-full bg-green-600 hover:bg-green-500 text-white transition">
            Register Now
          </Button>
        )}

        {(isUpdatePage || isDeletePage) && (
          <Button
            className={`w-full ${
              isUpdatePage
                ? "bg-yellow-600 hover:bg-yellow-500"
                : "bg-red-600 hover:bg-red-500"
            } text-white transition`}
            onClick={() => onAction(id)}
          >
            {isUpdatePage ? "Update the Event" : "Delete the Event"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
