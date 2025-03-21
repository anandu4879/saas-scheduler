"use client"; // Mark this as a Client Component

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) alert(error.message);
      else setBooking(data);
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