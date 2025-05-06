"use client";
import { useTransAction } from "@/hooks/useTransAction";
import { transactionSchema } from "@/validation/transActions";
import CustomFormField from "@/components/Form/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Field } from "@/validation/types/formTypes";
import { MultiUserSelect } from "../TransActions/MultiSelect";
import { Button } from "../ui/button";
import { ComboboxDemo } from "../ui/combobox";
import { Form } from "../ui/form";
import { Label } from "../ui/label";

const data: Field[] = [
  {
    type: "text",
    label: "مبلغ",
    placeholder: "کل مبلغ را وارد کنید",
    name: "amount",
    defaultValue: "",
  },
  {
    type: "text",
    label: "توضیحات",
    placeholder: "با دوستات چی خریدی",
    name: "description",
    defaultValue: "",
  },
];

export default function TransactionForm() {
  const methods = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: "",
      description: "",
      spenderId: undefined,
      shareUsers: [],
      shareUnits: [],
    },
  });

  //custom hook Create TransActions
  const { handleCreateTransAction, isPendingCreate } = useTransAction();

  const onSubmit = async (data) => {
    const formData = data;

    await handleCreateTransAction(formData);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex  items-end gap-2.5 mt-3.5 flex-col w-full">
          {data.map((item, i) => {
            return (
              <CustomFormField
                key={`${item.name}-${i}`}
                control={methods.control}
                type={item.type}
                formLabel={item.label}
                placeholder={item.placeholder}
                name={item.name}
                defaultValue={item.defaultValue}
              />
            );
          })}
          <Label className="mr-2">مادر خرج</Label>
          <ComboboxDemo nameField={"spenderId"} control={methods.control} />
          <Label className="mr-2">چه کسانی بودن؟</Label>
          <MultiUserSelect control={methods.control} nameField="shareUsers" />
        </div>
        <Button
          className="mt-5 w-full"
          type="submit"
          disabled={isPendingCreate}
        >
          ثبت
        </Button>
      </form>
    </Form>
  );
}
