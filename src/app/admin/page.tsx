"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await supabase.from("users").select("*");
      const { data: bookingsData } = await supabase.from("bookings").select("*");
      setUsers(usersData || []);
      setBookings(bookingsData || []);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Users</h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li key={user.id} className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-800">{user.email}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Bookings</h2>
            <ul className="space-y-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}