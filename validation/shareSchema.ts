import { z } from "zod";

export const schemaCreateShare = z.object({
  amount: z.string(),
  description: z.string(),
  spenderId: z.number(),
  participantIds: z.array(z.number()).min(1, "حداقل یک نفر رو انتخاب کن"),
});
