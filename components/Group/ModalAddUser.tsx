import { useInviteToGroup } from "@/hooks/useInviteToGroup";
import { senUserJoinReq } from "@/validation/sendJoinReq";
import CustomForm from "@/util/Form/CustomForm";
import { DialogDemo } from "@/util/Modal";
import type { Field } from "@/validation/types/formTypes";
const fields: Field[] = [
  {
    name: "userMobile",
    label: "شماره کاربر",
    type: "text",
    placeholder: "شماره موبایل کاربر را وارد کنید",
    defaultValue: "",
  },
];
export default function ModalAddUser() {
  const { handleInviteUser, isPending } = useInviteToGroup();

  return (
    <DialogDemo
      isLoading={isPending}
      description={
        "درخواست به کاربر ارسال میشود و پس از تایید وارد گروه خواهد شد."
      }
      title={"افزودن کاربر"}
      DialogTriggerJSX={
        <div className="bg-green-400 text-3xl fixed rounded-full w-15 h-15 bottom-5 left-5 flex items-center justify-center text-white cursor-pointer">
          +
        </div>
      }
    >
      {" "}
      <CustomForm
        btnText={"دعوت به گروه"}
        fields={fields}
        schema={senUserJoinReq}
        handleClickBtn={(data) => handleInviteUser(data)}
      />
    </DialogDemo>
  );
}
