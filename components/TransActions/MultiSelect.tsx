"use client";
import { useGetMembers } from "@/hooks/useGetMember";
import { Button } from "@/components/ui/button";
import {
  Command,
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
import { cn } from "@/lib/utils";
import Counter from "@/components/TransActions/Counter";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Controller, useWatch } from "react-hook-form";

export function MultiUserSelect({ control, nameField }) {
  const [open, setOpen] = React.useState(false);
  const { groupMembers } = useGetMembers(1);

  const selectedIds = useWatch({ control, name: nameField });

  const selectedUsers = groupMembers?.data.filter((user) =>
    selectedIds?.includes(user.member?.id)
  );

  return (
    <>
      <Controller
        control={control}
        name={nameField}
        defaultValue={[]}
        render={({ field, formState }) => (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[250px] justify-between">
                  {field.value.length > 0
                    ? ` ${field.value.length} نفر انتخاب شده `
                    : "افراد را انتخاب کن"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder="جستجوی نام..." />
                  <CommandList>
                    <CommandGroup>
                      {groupMembers?.data.map((user) => {
                        const id = user.member?.id;

                        const name = user.member?.name;
                        const isSelected = field.value.includes(id);
                        return (
                          <CommandItem
                            key={id}
                            onSelect={() => {
                              if (isSelected) {
                                field.onChange(
                                  field.value.filter((uid) => uid !== id)
                                );
                              } else {
                                field.onChange([...field.value, id]);
                              }
                            }}
                            className="cursor-pointer"
                          >
                            {name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                isSelected ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* نمایش ارور در صورت وجود */}
            {formState?.errors[nameField]?.message && (
              <div className="text-red-500 mt-2">
                {formState.errors[nameField].message as React.ReactNode}
              </div>
            )}
          </>
        )}
      />

      {/* نمایش کاربران انتخاب‌شده */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {selectedUsers?.map((user, i) => (
          <Counter
            key={`${user.member.id}-${i}`}
            userName={user.member.name}
            control={control}
            index={i}
          />
        ))}
      </div>
    </>
  );
}
