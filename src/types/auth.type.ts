import { type z } from "zod";
import { type authSchema } from "~/schemas/auth.schema";

export type authType = z.infer<typeof authSchema>;
