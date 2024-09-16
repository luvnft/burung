"use client";
import React, { useCallback, useEffect, useState } from "react";
import { QuerySearchAddress } from "@/hooks/use-query";
import { Input } from "./ui/input";
import { debounce } from "lodash";

type Props = {
  value: string | null;
  placeholder: string;
  setValue: (value: string) => void;
};

type ItemType = {
  name: string;
  place_formatted: string;
};

const AutoCompleteComponent = ({ value, placeholder, setValue }: Props) => {
  const [address, setAddress] = useState("");
  const [items, setItems] = useState<ItemType[]>([]);

  const debounceSearch = useCallback(
    debounce((nextValue: string) => {
      setAddress(nextValue);
    }, 500),
    []
  );

  const handleChangeInput = (value: string) => {
    setValue(value);
    debounceSearch(value);
  };

  const { data } = QuerySearchAddress(address);

  const handleSelectAddress = (item: ItemType) => {
    setItems([]);
    setValue(item.place_formatted);
  };

  useEffect(() => {
    if (data?.data?.suggestions) {
      setItems(data.data.suggestions);
    } else {
      setItems([]);
    }
  }, [data]);
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => handleChangeInput(e.target.value)}
      />
      {items && items.length > 0 && (
        <div className="absolute bg-white shadow-md rounded mt-2 w-full z-10">
          {items.map((item, index: number) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer flex flex-col gap-2"
              onClick={() => handleSelectAddress(item)} // Pass the selected item
            >
              <span className="text-xs text-gray-500">{item.name}</span>
              <p className="text-md">{item.place_formatted}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteComponent;
