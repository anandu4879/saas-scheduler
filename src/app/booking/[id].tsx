import { useRouter } from 'next/router';

export default function Booking() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Book an Appointment</h1>
      {/* Display available time slots and allow booking */}
    </div>
  );
}