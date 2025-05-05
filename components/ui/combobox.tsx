"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Controller } from "react-hook-form";

export function ComboboxDemo({ control, nameField }) {
  const pathName = usePathname();
  const groupID = pathName.split("/")[2];
  const queryClient = useQueryClient();
  const members = queryClient.getQueryData(["groupMembers", groupID]);

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
                  ? members?.data.find(
                      (user) => user.member?.id === field.value
                    )?.member?.name
                  : "مادر خرج را انتخاب کن"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="جستجوی کاربر..." />
                <CommandList>
                  <CommandEmpty>کاربر پیدا نشد</CommandEmpty>
                  <CommandGroup>
                    {members?.data.map((user) => (
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
