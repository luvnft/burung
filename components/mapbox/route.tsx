import React from "react";
import { Layer, Source } from "react-map-gl";

type Props = {
  coordinates: any;
};

const MapboxRoute = ({ coordinates }: Props) => {
  return (
    <Source
      type="geojson"
      data={{ type: "Feature", geometry: { type: "LineString", coordinates } }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
};

export default MapboxRoute;
