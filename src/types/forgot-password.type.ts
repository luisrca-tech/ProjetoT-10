import { type z } from "zod";
import {
  type backupPasswordSchema,
  type confirmEmailSchema,
} from "~/schemas/forgot-password.schema";

export type confirmEmail = z.infer<typeof confirmEmailSchema>;

export type backupPassword = z.infer<typeof backupPasswordSchema>;
