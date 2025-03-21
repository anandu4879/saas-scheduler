"use client";

import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "../../../lib/supabaseClient";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Payment() {
  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { data, error } = await supabase.functions.invoke("create-payment-intent", {
      body: JSON.stringify({ amount: 1000 }), // $10.00
    });

    if (error) alert(error.message);
    else {
      const result = await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
      if (result?.error) alert(result.error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment</h1>
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}