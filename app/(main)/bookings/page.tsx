"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Wrapper from "@/components/wrapper";
import React, { useEffect, useState } from "react";
import AutoCompleteComponent from "@/components/auto-complete";
import CarComponents from "@/components/car";
import PaymentComponent from "@/components/payment";
import ReactMapbox from "@/components/mapbox/map";

const Page = () => {
  const [addressOriginCoordinates, setAddressOriginCoordinates] = useState({
    lat: 0,
    long: 0,
  });
  const [addressDestinationCoordinates, setAddressDestinationCoordinates] =
    useState({
      lat: 0,
      long: 0,
    });
  const [paymentType, setPaymentType] = useState("");
  const [carType, setCarType] = useState("");
  const [chargesFee, setChargesFee] = useState(1);
  const [userLocation, setUserLocation] = useState({
    long: 0,
    lat: 0,
  });

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          long: pos.coords.longitude,
          lat: pos.coords.latitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("Izin lokasi ditolak oleh pengguna.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Lokasi tidak tersedia.");
            break;
          case error.TIMEOUT:
            console.error("Permintaan lokasi melebihi waktu tunggu.");
            break;
          default:
            console.error("Terjadi kesalahan saat mendapatkan lokasi.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <Wrapper>
      <div className="mt-36">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5">
            <Card className="lg:h-screen">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500">Where From?</Label>
                    <AutoCompleteComponent
                      placeholder="type your location..."
                      setValue={setAddressOriginCoordinates}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500">Where To?</Label>
                    <AutoCompleteComponent
                      placeholder="type your destination..."
                      setValue={setAddressDestinationCoordinates}
                    />
                  </div>
                  {!!addressOriginCoordinates.lat &&
                    !!addressDestinationCoordinates.lat && (
                      <>
                        <div className="flex flex-col gap-2">
                          <Label className="text-gray-500">Select Car</Label>
                          <CarComponents
                            value={carType}
                            setValue={setCarType}
                            chargesFee={chargesFee}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="text-gray-500">
                            Payment Method
                          </Label>
                          <PaymentComponent
                            value={paymentType}
                            setValue={setPaymentType}
                          />
                        </div>
                      </>
                    )}
                </div>
              </CardHeader>
            </Card>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ReactMapbox
              location={userLocation}
              addressOriginCoordinates={addressOriginCoordinates}
              addressDestinationCoordinates={addressDestinationCoordinates}
              setChargesFee={setChargesFee}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
