"use client";

import Wrapper from "@/components/wrapper";
import React from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/hooks/use-price-format";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
  const searchParams = useSearchParams();
  const amount_query = searchParams.get("amount");
  const amount_fee = Number(amount_query);

  return (
    <Wrapper>
      <main className="max-w-6xl mt-40 mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">You successfully sent</h2>

          <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
            ${formatPrice(amount_fee)}
          </div>

          <Link
            href={"/bookings"}
            className={buttonVariants({
              variant: "link",
            })}
          >
            Back to home
          </Link>
        </div>
      </main>
    </Wrapper>
  );
};

export default Page;
