import { DashboardSection } from "@/features/dashboard/components/dashboard";
import { useKeycloak } from "@/shared/hooks/useKeycloak";
import { useEffect, useState } from "react";

const services = [
  {
    title: "Event Creation",
    description:
      "Easily create and customize your events with flexible options and detailed management tools.",
  },
  {
    title: "Registration Management",
    description:
      "Track attendees and manage registrations efficiently with real-time updates and analytics.",
  },
  {
    title: "User Engagement",
    description:
      "Send updates and notifications to keep participants informed and engaged throughout the event.",
  },
  {
    title: "Secure Authentication",
    description:
      "Robust login system ensures your data and events stay secure with enterprise-level protection.",
  },
  {
    title: "Event Analytics",
    description:
      "Get detailed insights and reports on your events' performance and attendee engagement.",
  },
  {
    title: "Multi-Platform Support",
    description:
      "Access your events from any device with our responsive web platform and mobile support.",
  },
];

export default function Homepage() {
  const { user } = useKeycloak();
  const [isVisible, setIsVisible] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      observer.observe(servicesSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroAnimated(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="min-h-screen">
        <div
          className="flex flex-col items-center justify-center h-100 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: "url('/sample-background.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30 animate-pulse"></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center pt-10">
            <span
              className={`text-4xl md:text-5xl text-purple-300 font-semibold tracking-wide text-center pb-5 transition-opacity transition-transform duration-1000 ease-out
                ${
                  heroAnimated
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-8 scale-95"
                }`}
            >
              <span className="text-5xl">
                Schedule Your Event With,{" "}
                <span className="italic font-serif text-5xl">
                  Gatherly
                </span>{" "}
              </span>
            </span>
            <p
              className={` text-3xl md:text-4xl font-semibold text-white text-center mb-6 transition-opacity transition-transform duration-1000 ease-out
                ${
                  heroAnimated
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-8 scale-95"
                }`}
            >
              Welcome, {user?.name}
            </p>
          </div>

          <div
            className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"
            style={{ animationDuration: "3s", animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-purple-300/30 rounded-full animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-300/25 rounded-full animate-pulse"
            style={{ animationDuration: "5s", animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-48 right-20 w-5 h-5 bg-white/15 rounded-full animate-bounce"
            style={{ animationDuration: "3.5s", animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="bg-gradient-to-br from-slate-500 via-gray-900 to-black h-auto">
          <p
            className={`text-base text-gray-100 leading-relaxed text-center max-w-5xl mx-auto px-4 pt-14 pb-10 transition-opacity transition-transform duration-[1200ms] ease-out
                ${
                  heroAnimated
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
            style={{ transitionDelay: "400ms" }}
          >
            "Our platform is designed to simplify the way events are created,
            managed, and experienced. Whether you're an event organizer or an
            attendee, you'll find everything you need in one place — from
            creating and customizing events to registering and participating in
            them seamlessly. Administrators can efficiently manage event
            details, track registrations, and ensure everything runs smoothly,
            while public users can easily browse events, sign up, and receive
            timely updates. With secure authentication and a user-friendly
            interface, managing and joining events has never been easier. Start
            exploring now — discover new events or log in to begin organizing
            your own"
          </p>
          <div>
            <h1
              className={`text-center pb-3 text-white transition-opacity duration-1000
              ${heroAnimated ? "opacity-100" : "opacity-0"}`}
            >
              Stats
            </h1>
            <section>
              <DashboardSection />
            </section>
          </div>
        </div>
      </div>

      <section
        id="services-section"
        className="py-20 bg-gradient-to-br from-slate-900 via-gray-600 to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-opacity transition-transform duration-1000
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-8"
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the comprehensive suite of tools and features that make
              event management effortless
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
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
