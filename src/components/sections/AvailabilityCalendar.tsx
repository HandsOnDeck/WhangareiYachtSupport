"use client";

import { useEffect, useState } from "react";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Booking {
  checkIn: string;
  checkOut: string;
}

export function AvailabilityCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings/availability");
        if (res.ok) {
          const data = await res.json();
          setBookings(data.bookings || []);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = monthStart.getDay();

  function isBooked(date: Date): boolean {
    const day = startOfDay(date);
    return bookings.some((b) => {
      const checkIn = startOfDay(new Date(b.checkIn));
      const checkOut = startOfDay(new Date(b.checkOut));
      return day >= checkIn && day < checkOut;
    });
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-navy">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentMonth((m) => addMonths(m, -1))}
            className="rounded-md p-2 hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
            className="rounded-md p-2 hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const booked = isBooked(day);
          const past = isBefore(day, startOfDay(new Date()));
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "flex aspect-square items-center justify-center rounded-md text-sm",
                !isSameMonth(day, currentMonth) && "text-gray-300",
                isToday(day) && "ring-2 ring-ocean",
                booked && "bg-red-100 text-red-700",
                !booked && !past && "bg-green-50 text-green-700",
                past && "text-gray-300"
              )}
              aria-label={`${format(day, "d MMMM")}${booked ? ", booked" : ", available"}`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-green-50 ring-1 ring-green-200" />
          Available
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-red-100 ring-1 ring-red-200" />
          Booked
        </span>
      </div>

      {loading && (
        <p className="mt-2 text-xs text-gray-400">Loading availability...</p>
      )}
    </div>
  );
}
