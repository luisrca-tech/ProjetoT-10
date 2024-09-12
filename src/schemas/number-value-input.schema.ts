import { z } from "zod";
export const numberValueInputSchema = z.object({
  numberValue: z
    .string()
    .min(1, "Este campo é obrigatório")
    .regex(/^\d*\.?\d+$/),
});
