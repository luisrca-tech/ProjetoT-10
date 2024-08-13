import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Por favor, digite um email válido!"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres!")
    .max(255, "Este campo aceita apenas 255 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial '@'."
    ),
});