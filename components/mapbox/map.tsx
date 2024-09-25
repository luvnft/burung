"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Map, {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  MapProvider,
  MapRef,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { QueryNavigationRoute } from "@/hooks/use-query";
import MapboxRoute from "./route";
import MapboxInformation from "./information";

type LocationType = { lat: number; long: number };

type Props = {
  location: LocationType | null;
  addressOriginCoordinates: LocationType | null;
  addressDestinationCoordinates: LocationType | null;
  setChargesFee: (fee: number) => void;
};

const ReactMapbox = ({
  location,
  addressOriginCoordinates,
  addressDestinationCoordinates,
  setChargesFee,
}: Props) => {
  const [viewState, setViewState] = useState({
    longitude: location?.long ?? 0,
    latitude: location?.lat ?? 0,
    zoom: 15,
  });
  const [markerLocation, setMarkerLocation] = useState({
    longitude: location?.long ?? 0,
    latitude: location?.lat ?? 0,
  });

  const mapRef = useRef<MapRef>(null);

  const { data: directionRoute } = QueryNavigationRoute(
    addressOriginCoordinates,
    addressDestinationCoordinates
  );

  useEffect(() => {
    if (mapRef.current && addressOriginCoordinates) {
      mapRef.current.flyTo({
        center: [addressOriginCoordinates.long, addressOriginCoordinates.lat],
        duration: 2500,
        zoom: 13,
      });
    }
  }, [addressOriginCoordinates]);

  useEffect(() => {
    if (mapRef.current && addressDestinationCoordinates) {
      mapRef.current.flyTo({
        center: [
          addressDestinationCoordinates.long,
          addressDestinationCoordinates.lat,
        ],
        duration: 2500,
        zoom: 13,
      });
    }
  }, [addressDestinationCoordinates]);

  useEffect(() => {
    if (directionRoute) {
      const distance = directionRoute?.data?.routes[0]?.distance;
      const price = distance * 0.000621371192;
      setChargesFee(price);
    }
  }, [directionRoute, setChargesFee]);

  useEffect(() => {
    if (location) {
      setViewState({
        longitude: location.long,
        latitude: location.lat,
        zoom: 15,
      });
      setMarkerLocation({
        longitude: location.long,
        latitude: location.lat,
      });
    }
  }, [location]);

  return (
    <MapProvider>
      <div className="relative h-screen">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          attributionControl={false}
        >
          <FullscreenControl />
          <GeolocateControl />
          <NavigationControl />
          <AttributionControl customAttribution="Map design by Aswinnn" />

          {directionRoute && (
            <>
              <MapboxRoute
                coordinates={
                  directionRoute?.data?.routes[0]?.geometry?.coordinates
                }
              />
              <MapboxInformation
                distance={directionRoute?.data?.routes[0]?.distance}
                time={directionRoute?.data?.routes[0]?.duration}
              />
            </>
          )}

          {addressOriginCoordinates?.lat && (
            <Marker
              longitude={addressOriginCoordinates.long}
              latitude={addressOriginCoordinates.lat}
              anchor="bottom"
            >
              <Image src="/pin-map.png" alt="pin" width={50} height={50} />
            </Marker>
          )}

          {addressDestinationCoordinates?.lat && (
            <Marker
              longitude={addressDestinationCoordinates.long}
              latitude={addressDestinationCoordinates.lat}
              anchor="bottom"
            >
              <Image src="/pin-map.png" alt="pin" width={50} height={50} />
            </Marker>
          )}

          {!addressOriginCoordinates?.lat &&
            !addressDestinationCoordinates?.lat && (
              <Marker
                longitude={markerLocation.longitude}
                latitude={markerLocation.latitude}
                anchor="bottom"
              >
                <Image src="/pin-map.png" alt="pin" width={50} height={50} />
              </Marker>
            )}
        </Map>
      </div>
    </MapProvider>
  );
};

export default ReactMapbox;
