"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { formatPrice } from "@/hooks/use-price-format";

type Props = {
  amount_fee: number;
};

const CheckoutForm = ({ amount_fee }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount_fee}`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Number(amount_fee) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount_fee]);

  if (!stripe || !elements || !clientSecret) {
    return (
      <div className="flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment}>
      {clientSecret && <PaymentElement />}
      <Button disabled={!stripe || loading} className="mt-10">
        {!loading ? `Pay ${formatPrice(amount_fee)}` : "Processing..."}
      </Button>
    </form>
  );
};

export default CheckoutForm;
