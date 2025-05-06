"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useGetMembers } from "@/hooks/useGetMember";
import { Controller } from "react-hook-form";

export function ComboboxDemo({ control, nameField }) {
  const { groupMembers } = useGetMembers(1);
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      control={control}
      name={nameField}
      render={({ field, formState }) => (
        <>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {field.value
                  ? groupMembers?.data.find(
                      (user) => user.member?.id === field.value
                    )?.member?.name
                  : "مادر خرج را انتخاب کن"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>کاربر پیدا نشد</CommandEmpty>
                  <CommandGroup>
                    {groupMembers?.data?.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={String(user.member?.id)}
                        onSelect={(currentValue) => {
                          field.onChange(Number(currentValue));
                          setOpen(false);
                        }}
                      >
                        {user.member?.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            field.value === user.member?.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {formState?.errors?.[nameField]?.message && (
            <div className="text-red-500 text-sm">
              {formState?.errors?.[nameField]?.message as React.ReactNode}
            </div>
          )}
        </>
      )}
    />
  );
}
