"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

type Booking = {
  id: string;
  available_slots: string[];
};

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) alert(error.message);
      else setBooking(data as Booking);
    };

    fetchBooking();
  }, [id]);

  const handleBookSlot = async () => {
    const { error } = await supabase
      .from("bookings")
      .update({ available_slots: booking?.available_slots.filter(slot => slot !== selectedSlot) })
      .eq("id", id);
    if (error) alert(error.message);
    else {
      alert("Slot booked successfully!");
      // Send confirmation email
      await supabase.functions.invoke("send-booking-confirmation", {
        body: JSON.stringify({ email: "client@example.com", slot: selectedSlot }),
      });
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">Booking ID: {booking?.id}</p>
        <h2 className="text-xl font-bold mb-4">Available Slots</h2>
        <ul className="space-y-2">
          {booking?.available_slots.map((slot, index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedSlot(slot)}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                {slot}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleBookSlot}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Book Selected Slot
        </button>
      </div>
    </div>
  );
}