import { useState } from 'react';

export default function Schedule() {
  const [availability, setAvailability] = useState([]);

  const handleSaveAvailability = () => {
    // Save availability to Supabase
  };

  return (
    <div>
      <h1>Set Your Availability</h1>
      {/* Add a calendar or time picker here */}
      <button onClick={handleSaveAvailability}>Save Availability</button>
    </div>
  );
}