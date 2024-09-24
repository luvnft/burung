"use client";
import React from "react";
import { Card } from "./ui/card";
import { payments } from "@/constant/data";
import Image from "next/image";

type Props = {
  value?: string;
  setValue: (value: string) => void;
};

const PaymentComponent = ({ value, setValue }: Props) => {
  const choosePayment = (payment: string) => {
    if (value === payment) {
      return setValue("");
    }

    return setValue(payment);
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {payments.map((payment) => (
        <Card
          key={payment.name}
          className={`hover:bg-gray-100 cursor-pointer ${
            value === payment.name && "border border-blue-500 transition-all"
          }`}
          onClick={() => choosePayment(payment.name)}
        >
          <div className="p-3">
            <Image
              alt="car-image"
              src={payment.image}
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PaymentComponent;
