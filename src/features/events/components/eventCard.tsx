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
import { useState } from "react";
import { ConfirmationDialog } from "@/features/common/components/confirmationDialog";

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  eventDate,
  eventTime,
  location,
  cutoffDate,
  eventImageUrl,
  remainingSpots,
  onAction,
  onViewDetails,
  onViewRegistrations,
}) => {
  const { hasRole } = useRole();
  const { isUpdatePage, isDeletePage, isBrowsePage } = useCurrentEventPage();
  const today = new Date();
  const isRegistrationClosed = new Date(cutoffDate) < today;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirmationClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <Card className="w-full pt-0 max-w-sm rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-0">
        <div className="h-48 w-full overflow-hidden text-center">
          <img
            src={eventImageUrl || "/placeholder.png"}
            alt="Event"
            className="w-full h-full object-cover rounded-t-xl"
          />
          {isRegistrationClosed && (
            <div className="absolute w-full flex text-lg text-red-400 font-medium justify-center mt-3">
              Registration Closed!
            </div>
          )}
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
        <div className="text-green-300 font-semibold">
          {remainingSpots} Spots are Remaining
        </div>
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

        {isUpdatePage && (
          <Button
            className={`w-full ${
              isUpdatePage
                ? "bg-yellow-600 hover:bg-yellow-500"
                : "bg-red-600 hover:bg-red-500"
            } text-white transition`}
            onClick={() => onAction(id)}
          >
            Update the Event
          </Button>
        )}

        {isDeletePage && (
          <div>
            <Button
              className={`w-full ${
                isUpdatePage
                  ? "bg-yellow-600 hover:bg-yellow-500"
                  : "bg-red-600 hover:bg-red-500"
              } text-white transition`}
              onClick={handleConfirmationClick}
            >
              Delete the Event
            </Button>
            <ConfirmationDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onConfirm={() => onAction(id)}
              message="Your are about to delete this Event. Do you want to continue ?"
              dialogTitle="Delete Event"
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
