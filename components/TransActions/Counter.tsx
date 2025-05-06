import { Button } from "@/components/ui/button";
import React from "react";
import { Controller } from "react-hook-form";

export default function Counter({ userName, control, index }) {
  return (
    <div className="bg-amber-100 w-full p-2.5 rounded-2xl flex flex-col items-center justify-center">
      <div>{userName}</div>
      <Controller
        control={control}
        name={`shareUnits[${index}]`}
        defaultValue={1}
        render={({ field }) => (
          <div>
            <Button
              className="w-4 p-3 h-5 bg-amber-500 mx-2"
              onClick={(e) => {
                e.preventDefault();
                field.onChange(field.value > 1 ? field.value - 1 : field.value);
              }}
            >
              -
            </Button>
            {field.value}
            <Button
              className="w-4 p-3 h-5 bg-amber-500 mx-2"
              onClick={(e) => {
                e.preventDefault();
                field.onChange(field.value + 1);
              }}
            >
              +
            </Button>
          </div>
        )}
      />
    </div>
  );
}
