import { useEffect, useState } from "react";
import { EventCard } from "../components/eventCard";
import { getEventTypes, getFilteredEvents } from "../services/eventService";
import type {
  EventCardProps,
  EventTypeOption,
  FilterOptions,
} from "../types/types";
import { RefreshCw, ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventSearch from "../components/eventSearch";
import { useBoolean } from "@/shared/hooks/useBoolean";

export default function EventUpdateDisplayPage() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, { setTrue }] = useBoolean();
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [eventTypes, setEventTypes] = useState<EventTypeOption[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    type: "",
    dateFrom: "",
    dateTo: "",
    status: "",
  });

  useEffect(() => {
    fetchEvents();
    setTrue();
  }, [page]);

  const uniqueLocations = [
    ...new Set(events.map((event) => event.location)),
  ].filter(Boolean);
  const filteredEvents = events;

  useEffect(() => {
    getEventTypes()
      .then((value) => {
        setEventTypes(value);
      })
      .catch((err: any) => {
        setError(`Failed to fetch event types: ${err}`);
      });
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFilteredEvents(
        page,
        6,
        searchTerm,
        filters.type,
        filters.dateFrom,
        filters.dateTo,
        filters.location,
      );

      setEvents(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    window.location.href = `/events/${id}`;
  };

  const handleUpdatePage = (id: string) => {
    window.location.href = `/events-update/${id}`;
  };

  const handleViewRegistrations = (id: string) => {
    window.location.href = `/events/${id}/registrations`;
  };

  const applyFilters = () => {
    setPage(1);
    fetchEvents();
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      type: "",
      dateFrom: "",
      dateTo: "",
      status: "",
    });
    setSearchTerm("");
    setPage(1);
    fetchEvents();
  };

  const handleRefresh = () => {
    fetchEvents();
  };

  const hasActiveFilters =
    Object.values(filters).some((v) => v !== "" && v !== "All") ||
    searchTerm !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black relative overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 pt-8 px-6 pb-6 max-w-4xl mx-auto mb-12">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Update Events
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Modify and enhance your existing events with updated information and
            details
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <EventSearch
          filters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
          onRefresh={handleRefresh}
          loading={loading}
          eventTypes={eventTypes}
          uniqueLocations={uniqueLocations}
        />
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
            <p className="text-red-400 mb-3">{error}</p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-700 rounded-lg h-80 mb-4"
              ></div>
            ))}
          </div>
        ) : (
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20 max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {searchTerm || hasActiveFilters
                    ? "No matching events found"
                    : "No events available"}
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm || hasActiveFilters
                    ? "We couldn't find any events matching your criteria. Try adjusting your search or filters."
                    : "There are currently no events to display. Check back later for new events."}
                </p>
                <div className="flex gap-2 justify-center">
                  {searchTerm && (
                    <Button
                      onClick={() => setSearchTerm("")}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Clear Search
                    </Button>
                  )}
                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {filteredEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="opacity-0 animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <EventCard
                      {...event}
                      onAction={handleUpdatePage}
                      onViewDetails={handleViewDetails}
                      onViewRegistrations={handleViewRegistrations}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {!loading && filteredEvents.length > 0 && (
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-1000 pb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {filteredEvents.length}
                </div>
                <div className="text-gray-400">Events Found</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {new Set(filteredEvents.map((e) => e.location)).size}
                </div>
                <div className="text-gray-400">Unique Locations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {
                    filteredEvents.filter(
                      (e) => new Date(e.eventDate) > new Date(),
                    ).length
                  }
                </div>
                <div className="text-gray-400">Upcoming Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {events.length > 0
                    ? Math.round((filteredEvents.length / events.length) * 100)
                    : 0}
                  %
                </div>
                <div className="text-gray-400">Match Rate</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-4 items-center">
            <Button
              className="bg-gray-200 rounded text-black px-3 py-0 hover:bg-gray-300"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              aria-label="Previous Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <span className="text-white">
              Page {page} of {totalPages}
            </span>

            <Button
              className="bg-gray-200 rounded text-black px-3 py-0 hover:bg-gray-300"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              aria-label="Next Page"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
