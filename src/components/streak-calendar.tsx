'use client';

import { Calendar } from "@/components/ui/calendar";
import { streakDates } from "@/lib/data";
import { useState } from "react";

export function StreakCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md"
      modifiers={{
        streak: streakDates,
      }}
      modifiersClassNames={{
        streak: "bg-secondary text-secondary-foreground rounded-md",
      }}
    />
  );
}
