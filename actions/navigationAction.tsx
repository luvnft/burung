type LocationType = {
  lat: number;
  long: number;
};

export const navigationRoute = async (
  originAddress: LocationType | null,
  destinationAddress: LocationType | null
) => {
  if (originAddress && destinationAddress) {
    try {
      const req = await fetch(
        `/api/navigations?originAddressLat=${originAddress.lat}&originAddressLng=${originAddress.long}&destinationAddressLat=${destinationAddress.lat}&destinationAddressLng=${destinationAddress.long}`
      );

      if (!req.ok) {
        throw new Error(`Error status ${req.status}`);
      }

      const res = await req.json();

      return res;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
