import { useEffect, useState } from "react";
import { EventCard } from "../components/eventCard";
import { getEvents } from "../services/eventService";
import type { EventCardProps } from "../types/types";
import { Search, Edit, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EventUpdateDisplayPage() {
    const [events, setEvents] = useState<EventCardProps[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<EventCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchEvents(page);
        setIsVisible(true);
    }, [page]);

    useEffect(() => {
        if (Array.isArray(events)) {
            const filtered = events.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEvents(filtered);
        };
    }, [events, searchTerm]);

    const fetchEvents = async (pageNumber = 1) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getEvents(pageNumber, 6);
            setEvents(response.data.items);
            setTotalPages(response.data.totalPages);
            console.log("Raw events data:", response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Failed to load events. Please try again.");
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

    const handleRefresh = () => {
        fetchEvents(page);
    };

    const EventSkeleton = () => (
        <div className="animate-pulse">
            <div className="bg-gray-700 rounded-lg h-80 mb-4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black relative overflow-hidden pt-20">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 pt-8 px-6 pb-12">
                <div 
                    className={`text-center mb-12 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                    }`}
                >
                    <div className="flex items-center justify-center mb-4">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-orange-100 to-yellow-100 bg-clip-text text-transparent">
                            Update Events
                        </h1>
                    </div>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
                        Modify and enhance your existing events with updated information and details
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div 
                    className={`max-w-4xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                </div>

                <div 
                    className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search events to update by name or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400/50"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleRefresh}
                                    disabled={loading}
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                >
                                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <span>{filteredEvents.length} Events Available for Update</span>
                            </div>
                            {searchTerm && (
                                <div className="flex items-center gap-2">
                                    <Search className="w-4 h-4 text-yellow-400" />
                                    <span>Filtered by: "{searchTerm}"</span>
                                </div>
                            )}
                        </div>
                    </div>
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
                                <EventSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div 
                            className={`transition-all duration-1000 delay-500 ${
                                isVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {filteredEvents.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                                            <Edit className="w-12 h-12 text-gray-500" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-white mb-4">
                                            {searchTerm ? 'No matching events found' : 'No events available to update'}
                                        </h3>
                                        <p className="text-gray-400 mb-6">
                                            {searchTerm 
                                                ? `We couldn't find any events matching "${searchTerm}". Try adjusting your search terms.`
                                                : 'There are currently no events available for modification. Create some events first.'
                                            }
                                        </p>
                                        {searchTerm && (
                                            <Button 
                                                onClick={() => setSearchTerm("")}
                                                variant="outline"
                                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                            >
                                                Clear Search
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
                                                animationFillMode: 'forwards'
                                            }}
                                        >
                                            <EventCard
                                                {...event}
                                                onAction={handleUpdatePage}
                                                onViewDetails={handleViewDetails}
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
                        className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-orange-400 mb-2">{filteredEvents.length}</div>
                                    <div className="text-gray-400">Events Ready for Update</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                                        {filteredEvents.filter(e => new Date(e.eventDate) > new Date()).length}
                                    </div>
                                    <div className="text-gray-400">Upcoming Events</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-amber-400 mb-2">
                                        {new Set(filteredEvents.map(e => e.location)).size}
                                    </div>
                                    <div className="text-gray-400">Unique Locations</div>
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <div className="flex items-center justify-center mb-2">
                                    <CheckCircle className="w-5 h-5 text-orange-400 mr-2" />
                                    <span className="text-orange-300 font-medium">Update Tips</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Click on any event card to modify its details, change the schedule, update location, or adjust registration settings.
                                </p>
                            </div>
                        </div>

                        
                        <div className="flex justify-center mt-6 gap-4">
                            <button
                            className="px-4 py-2 bg-gray-200 rounded"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            >
                            Previous
                            </button>
                            <span className="text-white">Page {page} of {totalPages}</span>
                            <button
                            className="px-4 py-2 bg-gray-200 rounded"
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            >
                            Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

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