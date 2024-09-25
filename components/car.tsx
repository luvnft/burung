"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cars } from "@/constant/data";
import Image from "next/image";
import { formatPrice } from "@/hooks/use-price-format";

type Props = {
  value?: string;
  chargesFee?: number;
  setValue: (value: string) => void;
};

const CarComponents = ({ value, chargesFee, setValue }: Props) => {
  const chooseCar = (car: string) => {
    if (value === car) {
      return setValue("");
    }

    return setValue(car);
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <Card
          key={car.name}
          className={`hover:bg-gray-100 cursor-pointer ${
            value === car.name && "border border-blue-500 transition-all"
          }`}
          onClick={() => chooseCar(car.name)}
        >
          <div className="relative h-[100px]">
            <Image
              alt="car-image"
              src={car.image}
              fill
              sizes="100%"
              className="w-full h-full object-contain"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{car.name}</CardTitle>
            <CardDescription>
              {chargesFee && formatPrice(chargesFee * car.price)}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default CarComponents;
