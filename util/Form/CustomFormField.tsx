"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

export default function CustomFormField({
  control,
  name,
  formLabel,
  placeholder,
  type,
  defaultValue,
}) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="flex justify-end mt-5 mr-2">
            {formLabel}
          </FormLabel>
          <FormControl>
            <Input
              className="text-right"
              type={`${type || "text"}`}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
