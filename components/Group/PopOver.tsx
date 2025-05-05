"use client";

import { useRDgroup } from "@/hooks/useRDgroup";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { FaEllipsisVertical, FaRegTrashCan } from "react-icons/fa6";
import ModalRenameGroup from "./ModalRenameGroup";

type PopoverDemoProps = {
  groupID: string;
};

export function PopoverDemo({ groupID }: PopoverDemoProps) {
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);

  const { handleDeleteGroup } = useRDgroup();

  return (
    <Popover open={isModalopen} onOpenChange={(e) => setIsModalOpen(e)}>
      <PopoverTrigger asChild>
        <div>
          <FaEllipsisVertical className="cursor-pointer " />
        </div>
        {/* Trigger icon for popover */}
      </PopoverTrigger>
      <PopoverContent className="w-40 border-sky-200  bg-sky-100">
        <div className="grid gap-4">
          <div className="gap-y-2 flex flex-col items-center">
            {/* Button to delete group */}
            <Button
              onClick={() => handleDeleteGroup(groupID)}
              variant="outline"
              className="border-none bg-red-500 w-full cursor-pointer hover:bg-red-700 transition-all duration-300 hover:text-white text-white flex justify-center items-center"
            >
              <FaRegTrashCan color="white" />
              حذف {/* Delete */}
            </Button>

            {/* Button to open the edit groupName modal */}
            <ModalRenameGroup groupID={groupID} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
