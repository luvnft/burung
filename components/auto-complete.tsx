"use client";
import React, { useEffect, useMemo, useState } from "react";
import { QueryRetrieveAddress, QuerySearchAddress } from "@/hooks/use-query";
import { Input } from "./ui/input";
import { debounce } from "lodash";

type Props = {
  placeholder: string;
  setValue: ({ lat, long }: { lat: number; long: number }) => void;
};

type ItemType = {
  mapbox_id: string;
  name: string;
  place_formatted: string;
  full_address: string;
};

const AutoCompleteComponent = ({ placeholder, setValue }: Props) => {
  const [address, setAddress] = useState("");
  const [mapboxID, setMapboxID] = useState("");
  const [queryAddress, setQueryAddress] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);
  const [openBox, setOpenBox] = useState(false);

  const debounceSearch = useMemo(
    () => debounce((nextValue: string) => setQueryAddress(nextValue), 500),
    []
  );

  const handleChangeInput = (value: string) => {
    setAddress(value);
    debounceSearch(value);
  };

  const { data: searchData } = QuerySearchAddress(queryAddress);

  const { data: retrieveData } = QueryRetrieveAddress(mapboxID);

  const handleSelectAddress = (item: ItemType) => {
    setItems([]);
    setMapboxID(item.mapbox_id);
    setAddress(item.place_formatted);
  };

  useEffect(() => {
    if (retrieveData?.data?.features[0]?.geometry) {
      setValue({
        lat: retrieveData.data.features[0]?.geometry?.coordinates[1],
        long: retrieveData.data.features[0]?.geometry?.coordinates[0],
      });
    }
  }, [retrieveData, setValue]);

  useEffect(() => {
    if (searchData?.data?.suggestions) {
      setItems(searchData.data.suggestions);
    } else {
      setItems([]);
    }
  }, [searchData]);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={address}
        onChange={(e) => handleChangeInput(e.target.value)}
        onFocus={() => setOpenBox((prev) => !prev)}
      />
      {items.length > 0 && openBox && (
        <div className="absolute bg-white shadow-md rounded mt-2 w-full z-10">
          {items.map((item) => (
            <button
              key={item.mapbox_id}
              className="p-2 hover:bg-gray-200 cursor-pointer flex flex-col w-full gap-2 text-left"
              onClick={() => handleSelectAddress(item)}
            >
              <span className="text-xs text-gray-500">{item.name}</span>
              <p className="text-md">{item.place_formatted}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteComponent;
