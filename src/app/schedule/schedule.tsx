"use client"; // Mark this as a Client Component

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Schedule() {
  const [availability, setAvailability] = useState([]);

  const handleSaveAvailability = async () => {
    // Save availability to Supabase
    const { error } = await supabase
      .from("availability")
      .insert([{ availability }]);
    if (error) alert(error.message);
    else alert("Availability saved!");
  };

  return (
    <div>
      <h1>Set Your Availability</h1>
      {/* Add a calendar or time picker here */}
      <button onClick={handleSaveAvailability}>Save Availability</button>
    </div>
  );
}