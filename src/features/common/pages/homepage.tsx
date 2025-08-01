import { useKeycloak } from "@/shared/hooks/useKeycloak";
import { useEffect, useState } from "react";

const services = [
  {
    title: "Event Creation",
    description: "Easily create and customize your events with flexible options and detailed management tools.",
  },
  {
    title: "Registration Management",
    description: "Track attendees and manage registrations efficiently with real-time updates and analytics.",

  },
  {
    title: "User Engagement",
    description: "Send updates and notifications to keep participants informed and engaged throughout the event.",
  },
  {
    title: "Secure Authentication",
    description: "Robust login system ensures your data and events stay secure with enterprise-level protection.",
  },
  {
    title: "Event Analytics",
    description: "Get detailed insights and reports on your events' performance and attendee engagement.",
  },
  {
    title: "Multi-Platform Support",
    description: "Access your events from any device with our responsive web platform and mobile support.",
  }
];

export default function Homepage() {
  const { user } = useKeycloak();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      observer.observe(servicesSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <div 
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/homepage-background-image.jpg')" }}
      >
        <h1 className="text-2xl font-bold text-white">Welcome, {user?.name}</h1>
        <p className="text-white py-10 px-60 text-center">
          Our platform is designed to simplify the way events are created, managed, and experienced. Whether you're an event organizer or an attendee, you'll find everything you need in one place — from creating and customizing events to registering and participating in them seamlessly.
          Administrators can efficiently manage event details, track registrations, and ensure everything runs smoothly, while public users can easily browse events, sign up, and receive timely updates. With secure authentication and a user-friendly interface, managing and joining events has never been easier.
          Start exploring now — discover new events or log in to begin organizing your own
        </p>
        <p className="text-white">Email: {user?.email}</p>
      </div>

      <section 
        id="services-section"
        className="py-20 bg-gradient-to-br from-slate-900 via-gray-600 to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the comprehensive suite of tools and features that make event management effortless
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(48px)'
                }}
              >
                <h3 className="text-2xl font-semibold text-purple-300 mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}