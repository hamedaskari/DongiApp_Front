import { z } from "zod";

export const senUserJoinReq = z.object({
  userMobile: z.string().default(""),
});
