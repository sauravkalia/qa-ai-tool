
import { MainLayout } from "@/components/layout/main-layout";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Plan and schedule your test runs
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="p-6 glass">
            <h2 className="text-lg font-semibold mb-4">Test Calendar</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </Card>
          
          <Card className="p-6 glass">
            <h2 className="text-lg font-semibold mb-4">Upcoming Tests</h2>
            <div className="text-center text-muted-foreground p-8">
              No scheduled tests for now
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
