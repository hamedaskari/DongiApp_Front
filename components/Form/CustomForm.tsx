"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/Form/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Field } from "@/validation/types/formTypes";
import type { z } from "zod";

type CustomFormProps = {
  schema: z.ZodType;
  fields: Field[];
  btnText: string;
  handleClickBtn: (data: Record<string, any>) => void;
};

export default function CustomForm({
  schema,
  fields,
  btnText,
  handleClickBtn,
}: CustomFormProps) {
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? "";
    return acc;
  }, {} as Record<string, unknown>);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = methods;

  const onSubmit = async (data: Record<string, unknown>) => {
    await handleClickBtn(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item) => (
          <CustomFormField
            key={item.name}
            control={control}
            type={item.type}
            formLabel={item.label}
            placeholder={item.placeholder}
            name={item.name}
            defaultValue={item.defaultValue}
          />
        ))}

        <div className="flex w-full justify-center">
          <Button
            disabled={isSubmitting}
            className="text-center cursor-pointer transition-all duration-300  flex mt-2.5 justify-center"
            type="submit"
          >
            {isSubmitting ? "درحال انجام" : btnText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
