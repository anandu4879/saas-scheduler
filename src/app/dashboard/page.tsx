"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) window.location.href = "/login";
      else setUser(user);
    };

    fetchUser();
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user?.id);
    if (error) alert(error.message);
    else setBookings(data || []);
  };

  const handleAddBooking = async () => {
    if (!bookingDate || !bookingTime) {
      alert("Please fill in all fields.");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .insert([{ user_id: user?.id, date: bookingDate, time: bookingTime }]);
    if (error) alert(error.message);
    else {
      alert("Booking added successfully!");
      setBookingDate("");
      setBookingTime("");
      fetchBookings(); // Refresh the bookings list
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <p className="text-gray-700">Welcome, {user.email}!</p>

        {/* Add Booking Form */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Add a Booking</h2>
          <div className="space-y-4">
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddBooking}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Booking
            </button>
          </div>
        </div>

        {/* Display Bookings */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-700">No bookings found.</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li key={booking.id} className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-800">
                    <span className="font-bold">Date:</span> {booking.date}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-bold">Time:</span> {booking.time}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}