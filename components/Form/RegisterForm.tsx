"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/Form/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRegister } from "@/hooks/useRegister";
import { schema } from "@/validation/formSchema";

export default function RegisterForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      family: "",
      userMobile: "",
    },
  });

  //custom hook register
  const { handleRegister, isPending }: any = useRegister();

  //when submit form
  const onSubmit = async (data) => {
    //handler register user
    handleRegister(data);
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-96 p-6"
        >
          <CustomFormField
            defaultValue={""}
            control={methods.control}
            type={"text"}
            formLabel={"نام"}
            placeholder={"نام خود را وارد کنید"}
            name={"name"}
          />
          <CustomFormField
            defaultValue={""}
            control={methods.control}
            type={"text"}
            formLabel={"نام خانوادگی"}
            placeholder={"نام خانوادگی خود را وارد کنید"}
            name={"family"}
          />
          <CustomFormField
            defaultValue={""}
            control={methods.control}
            type={"text"}
            formLabel={"تلفن"}
            placeholder={"شماره خود را وارد کنید"}
            name={"userMobile"}
          />

          <Button className="cursor-pointer" disabled={isPending} type="submit">
            {isPending ? "درحال انجام..." : "ثبت نام  "}
          </Button>
        </form>
      </Form>
    </div>
  );
}
