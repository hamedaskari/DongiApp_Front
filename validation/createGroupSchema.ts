import { z } from "zod";

export const createGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, "نام گروه نمی‌تواند خالی باشد")
    .max(100, "نام گروه نباید بیش از ۱۰۰ کاراکتر باشد")
    .refine((val) => !/^\d+$/.test(val.trim()), {
      message: "نام گروه نباید فقط عدد باشد",
    }),
});
