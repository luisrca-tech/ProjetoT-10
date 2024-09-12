import { type z } from "zod";
import { type numberValueInputSchema } from "~/schemas/number-value-input.schema";

export type numberValueData = z.infer<typeof numberValueInputSchema>;
