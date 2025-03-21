"use client"; // Mark this as a Client Component

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

// Define a type for the booking data
type Booking = {
  id: string;
  // Add other fields as needed
};

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null); // Initialize with the correct type

  useEffect(() => {
    const fetchBooking = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) alert(error.message);
      else setBooking(data as Booking); // Cast the data to the Booking type
    };

    fetchBooking();
  }, [id]);

  if (!booking) return <p>Loading...</p>;

  return (
    <div>
      <h1>Book an Appointment</h1>
      <p>Booking ID: {booking.id}</p>
      {/* Display booking details here */}
    </div>
  );
}