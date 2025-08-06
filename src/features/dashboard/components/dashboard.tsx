// src/components/DashboardSection.tsx

import { useEffect, useState } from "react";
import type { DashboardStats } from "../types/types";
import { getDashboardStats } from "../services/dashboardService";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((response) => setStats(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats)
    return <p className="text-center py-10 text-muted">No stats found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pb-20 px-20">
      <Card className="bg-gray-300">
        <CardContent className="flex flex-col p-6">
          <p className="text-3xl font-semibold text-primary text-center">
            {stats.totalEvents}
          </p>
          <h3 className="text-lg text-muted-foreground mb-1 text-center">
            Total Events
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-gray-300">
        <CardContent className="flex flex-col p-6">
          <p className="text-3xl font-semibold text-primary text-center">
            {stats.totalRegistrations}
          </p>
          <h3 className="text-lg text-muted-foreground mb-1 text-center">
            Total Registrations
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-gray-300">
        <CardContent className="flex flex-col p-6">
          <p className="text-3xl font-semibold text-primary text-center">
            {stats.upcomingEvents}
          </p>
          <h3 className="text-lg text-muted-foreground mb-1 text-center">
            Upcoming Events
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}
