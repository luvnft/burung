"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Wrapper from "@/components/wrapper";
import React, { useEffect, useState } from "react";
import MapComponent from "@/components/map";
import AutoCompleteComponent from "@/components/auto-complete";

const Page = () => {
  const [cardHeight, setCardHeight] = useState(0);
  const [addressOrigin, setAddressOrigin] = useState("");
  const [addressDestination, setAddressDestination] = useState("");

  useEffect(() => {
    if (window) {
      setCardHeight(window.innerHeight * 0.7);
    }
  }, []);
  return (
    <Wrapper>
      <div className="mt-36">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5">
            <Card
              style={{ height: `${Math.floor(cardHeight)}px` }}
              className="lg:h-auto"
            >
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500">Where From?</Label>
                    <AutoCompleteComponent
                      placeholder="type your location..."
                      value={addressOrigin}
                      setValue={setAddressOrigin}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500">Where To?</Label>
                    <AutoCompleteComponent
                      placeholder="type your destination..."
                      value={addressDestination}
                      setValue={setAddressDestination}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500">Select Car</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>Economy</CardHeader>
                      </Card>
                      <Card>
                        <CardHeader>Special</CardHeader>
                      </Card>
                      <Card>
                        <CardHeader>Luxury</CardHeader>
                      </Card>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500">Payment Method</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>Economy</CardHeader>
                      </Card>
                      <Card>
                        <CardHeader>Special</CardHeader>
                      </Card>
                      <Card>
                        <CardHeader>Luxury</CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
          <div className="col-span-12 lg:col-span-7">
            {/* <Card
              style={{ height: `${Math.floor(cardHeight)}px` }}
              className="lg:h-auto"
            >
            </Card> */}
            <MapComponent />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
