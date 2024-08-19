import { type z } from "zod";
import { type registerSchema } from "~/schemas/register.schema";

export type registerType = z.infer<typeof registerSchema>;
