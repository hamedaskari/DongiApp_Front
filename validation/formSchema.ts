import { z } from "zod";

const nameValidation = z
  .string()
  .min(2, "نام باید حداقل 2 کاراکتر باشد")
  .max(50, "نام نمی‌تواند بیشتر از 50 کاراکتر باشد");

const phoneValidation = z
  .string()
  .regex(/^\d{11}$/, "شماره تلفن باید 10 رقمی باشد");

export const schema = z.object({
  name: nameValidation,
  family: nameValidation,
  userMobile: phoneValidation,
});
