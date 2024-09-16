import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export default function MapComponent() {
  const [cardHeight, setCardHeight] = useState(0);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-71.0325);
  const [lat, setLat] = useState(42.3908);
  const [zoom, setZoom] = useState(18);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    if (window) {
      setCardHeight(window.innerHeight * 0.7);
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      if (map.current) {
        const newLng = Number(map.current.getCenter().lng.toFixed(4));
        const newLat = Number(map.current.getCenter().lat.toFixed(4));
        const newZoom = Number(map.current.getZoom().toFixed(2));

        setLng(newLng);
        setLat(newLat);
        setZoom(newZoom);
      }
    });
  }, [lng, lat, zoom]);

  return (
    <div className="relative">
      <div className="py-[6px] px-[12px] z-10 absolute top-0 left-0 m-[12px] rounded-lg text-white bg-gray-500">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="rounded-lg"
        style={{ height: `${Math.floor(cardHeight)}px` }}
      />
    </div>
  );
}
