"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Schedule() {
  const [availability, setAvailability] = useState<Date[]>([]);
  const [recurring, setRecurring] = useState(false);
  const [blockedSlots, setBlockedSlots] = useState<Date[]>([]);

  const handleSaveAvailability = async () => {
    const { error } = await supabase
      .from("availability")
      .insert([{ availability, recurring, blockedSlots }]);
    if (error) alert(error.message);
    else alert("Availability saved!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Set Your Availability</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Calendar
          onChange={(value) => setAvailability(value as Date[])}
          selectRange={true}
        />
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="mr-2"
            />
            Recurring Availability
          </label>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Block Time Slots</h2>
          <Calendar
            onChange={(value) => setBlockedSlots(value as Date[])}
            selectRange={true}
          />
        </div>
        <button
          onClick={handleSaveAvailability}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
}