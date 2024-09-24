import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mapbox_id = searchParams.get("id");
  const sessionToken = uuidv4();
  try {
    const req = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}?session_token=${sessionToken}&access_token=${token}`
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
