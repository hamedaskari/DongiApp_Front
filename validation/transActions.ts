import { z } from "zod";

export const transactionSchema = z.object({
  amount: z
    .string()
    .nonempty("مبلغ الزامی است")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "مبلغ باید عددی مثبت باشد",
    }),
  description: z
    .string()
    .min(2, "توضیحات باید حداقل ۲ کاراکتر داشته باشد")
    .max(255, "توضیحات نباید بیشتر از ۲۵۵ کاراکتر باشد"),
  spenderId: z.number({
    required_error: "مادر خرج الزامی است",
    invalid_type_error: "مقدار وارد شده نامعتبر است",
  }),
  shareUsers: z
    .array(z.number().or(z.string().regex(/^\d+$/).transform(Number)))
    .min(1, "حداقل یک نفر باید انتخاب شود"),
  shareUnits: z
    .array(z.number().or(z.string().regex(/^\d+$/).transform(Number)))
    .min(1, "حداقل یک نفر باید انتخاب شود"),
});
