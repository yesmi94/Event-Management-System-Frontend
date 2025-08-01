import React from "react";
import type { EventRegistrationCardProps } from "../types/types";

const EventRegistrationCard: React.FC<EventRegistrationCardProps> = ({
  eventImageUrl,
  userName,
  email,
  phoneNumber,
  eventName,
  eventDate,
  eventTime,
  onCancel,
}) => {
  return (
    <div
      className="relative w-full max-w-sm h-72 rounded-2xl shadow-lg overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${eventImageUrl})` }}
    >

      <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-4 text-white">
        <div>
          <h2 className="text-xl font-semibold">{eventName}</h2>
          <h3 className="text-xl font-semibold">{userName}</h3>
          <p className="text-sm">{email}</p>
          <p className="text-sm">{phoneNumber}</p>
        </div>

        <div>
            <p className="text-sm">{eventDate}</p>
            <p className="text-sm">{eventTime}</p>
        </div>

        <div className="text-right">
          <button
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Cancel Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationCard;
