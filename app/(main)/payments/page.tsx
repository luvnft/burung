"use client";

import Wrapper from "@/components/wrapper";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout-form";
import { useRouter, useSearchParams } from "next/navigation";
import { parsePrice } from "@/hooks/use-price-format";

if (
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined ||
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY === undefined
) {
  throw new Error("Stripe key is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount_query = searchParams.get("amount");
  const amount_fee = parsePrice(amount_query!);

  if (!amount_fee) {
    return router.push("/bookings");
  }

  return (
    <Wrapper>
      <main className="max-w-6xl mt-40 mx-auto p-10 text-white text-center border m-10 rounded-md">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: amount_fee,
            currency: "idr",
          }}
        >
          <CheckoutForm amount_fee={amount_fee} />
        </Elements>
      </main>
    </Wrapper>
  );
};

export default Page;
