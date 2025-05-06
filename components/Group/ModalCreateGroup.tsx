import { useCreateGroup } from "@/hooks/useCreateGroup";
import CustomForm from "@/components/Form/CustomForm";
import Loading from "@/components/loading/Loading";
import { DialogDemo } from "@/components/Modal";
import { createGroupSchema } from "@/validation/createGroupSchema";
import type { Field } from "@/validation/types/formTypes";

//form input
const fields: Field[] = [
  {
    name: "groupName",
    label: "نام گروه",
    type: "text",
    placeholder: "نام گروه جدید را وارد کنید",
    defaultValue: "",
  },
];

export default function ModalCreateGroup() {
  //handle create group
  const { handleCreateGroup, isPending, isSuccess } = useCreateGroup();

  return (
    <>
      <DialogDemo
        modalState={isSuccess}
        isLoading={isPending}
        description="یک گروه برای حساب کردن دنگ ها ایجاد کنید."
        title="ایجاد گروه"
        DialogTriggerJSX={
          <div className="bg-green-400 text-3xl fixed rounded-full w-15 h-15 bottom-5 left-5 flex items-center justify-center text-white cursor-pointer">
            +
          </div>
        }
      >
        {isPending ? (
          <>
            <Loading />
          </>
        ) : (
          <CustomForm
            btnText="ساخت گروه"
            fields={fields}
            schema={createGroupSchema}
            handleClickBtn={handleCreateGroup}
          />
        )}
      </DialogDemo>
    </>
  );
}
