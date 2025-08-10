import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBoolean } from "@/shared/hooks/useBoolean";

const EventActionsPage = () => {
  const navigate = useNavigate();
  const [isVisible, { setTrue }] = useBoolean();

  useEffect(() => {
    setTrue();
  }, []);

  const actions = [
    {
      title: "Create Event",
      description:
        "Organize and publish a new event with custom details and settings.",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600",
      onClick: () => {
        navigate("/event-creation");
      },
    },
    {
      title: "Browse Events",
      description: "Discover and explore upcoming events in your area.",
      color: "from-green-500 to-emerald-500",
      hoverColor: "hover:from-green-600 hover:to-emerald-600",
      onClick: () => {
        navigate("/events");
      },
    },
    {
      title: "Update Events",
      description: "Edit and modify events that are already created.",
      color: "from-orange-500 to-yellow-500",
      hoverColor: "hover:from-orange-600 hover:to-yellow-600",
      onClick: () => {
        navigate("/events-update");
      },
    },
    {
      title: "Delete Events",
      description: "Review and permanently remove unwanted events.",
      color: "from-red-500 to-pink-500",
      hoverColor: "hover:from-red-600 hover:to-pink-600",
      onClick: () => {
        navigate("/events-delete");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Event Actions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from our powerful event management tools to create, organize,
            and manage your events
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {actions.map((action, index) => {
            return (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 h-[300px] bg-white/20 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
                onClick={action.onClick}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-200 group-hover:text-gray-300 text-base leading-relaxed transition-colors duration-300">
                    {action.description}
                  </CardDescription>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${action.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                      ></div>
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${action.color} opacity-40 group-hover:opacity-80 transition-opacity duration-300 delay-75`}
                      ></div>
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${action.color} opacity-20 group-hover:opacity-60 transition-opacity duration-300 delay-150`}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                      Click to proceed
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gray-500 text-sm">
            Need help? Check our documentation or contact support for
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventActionsPage;
