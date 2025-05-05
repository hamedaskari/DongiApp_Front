import { DialogDemo } from "@/util/Modal";
import React from "react";
import { Button } from "../ui/button";
import { FaPencil } from "react-icons/fa6";
import CustomForm from "@/util/Form/CustomForm";
import { useRDgroup } from "@/hooks/useRDgroup";
import { createGroupSchema } from "@/validation/createGroupSchema";
import type { Field } from "@/validation/types/formTypes";
const fields: Field[] = [
  {
    name: "groupName",
    label: "نام جدید",
    type: "text",
    placeholder: "نام جدید را وارد کنید",
    defaultValue: "",
  },
];
export default function ModalRenameGroup({ groupID }: { groupID: string }) {
  const { handleRenameGroup, isPendingRename } = useRDgroup();
  return (
    <DialogDemo
      isLoading={isPendingRename}
      description="نام گروه را تغییر دهید"
      title="تغییر نام گروه"
      DialogTriggerJSX={
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-green-700 transition-all duration-300 hover:text-white bg-green-500 w-full text-white flex justify-center items-center"
        >
          <FaPencil color="white" />
          ویرایش
        </Button>
      }
    >
      {/* Custom form for renaming the group */}
      <CustomForm
        btnText="تغییر نام گروه"
        fields={fields}
        schema={createGroupSchema}
        handleClickBtn={(data) =>
          handleRenameGroup({ groupName: data.groupName, groupID })
        }
      />
    </DialogDemo>
  );
}
