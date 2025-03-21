"use client";

import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              SaaS Scheduling Tool
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/schedule" className="hover:underline">
                Schedule
              </Link>
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}