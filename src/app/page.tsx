import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Scheduling Tool</h1>
      <div className="flex gap-4">
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}