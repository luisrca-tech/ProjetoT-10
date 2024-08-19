import { type z } from "zod";
import { type loginSchema } from "~/schemas/login.schema";

export type loginType = z.infer<typeof loginSchema>;
