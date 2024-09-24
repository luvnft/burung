import { NextRequest } from "next/server";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const addressOriginCoordinatesLat = searchParams.get("originAddressLat");
  const addressOriginCoordinatesLng = searchParams.get("originAddressLng");

  const addressDestinationCoordinatesLat = searchParams.get(
    "destinationAddressLat"
  );
  const addressDestinationCoordinatesLng = searchParams.get(
    "destinationAddressLng"
  );
  try {
    const req = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/` +
        `${addressOriginCoordinatesLng},${addressOriginCoordinatesLat};` +
        `${addressDestinationCoordinatesLng},${addressDestinationCoordinatesLat}` +
        `?overview=full&geometries=geojson` +
        `&access_token=${token}`
    );

    if (req.ok) {
      const res = await req.json();
      return Response.json({ message: "success", data: res });
    }

    return Response.json({ message: "error", data: "not authorized" });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "error", data: err });
  }
}
