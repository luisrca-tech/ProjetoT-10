import { z } from "zod";

export const formPersonsSchema = z.object({
  names: z.array(
    z.string().min(1, "Por favor, preencha o nome referente ao cargo.")
  ),
});
