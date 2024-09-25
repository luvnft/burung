import React from "react";

type Props = {
  distance: number;
  time: number;
};

const MapboxInformation = ({ distance, time }: Props) => {
  return (
    <div className="absolute top-2 left-2 flex items-center gap-3 rounded-lg p-4 bg-black text-white">
      <p className="font-normal">
        Distance:{" "}
        <span className="font-bold">
          {(distance * 0.000621371192).toFixed(2)} Miles
        </span>
      </p>
      <p className="font-normal">
        Duration:{" "}
        <span className="font-bold">{(time / 60).toFixed(2)} Minutes</span>
      </p>
    </div>
  );
};

export default MapboxInformation;
