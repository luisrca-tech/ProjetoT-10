import { type z } from "zod";
import { type configurationSchema } from "~/schemas/configuration-schema";

export type configurationType = z.infer<typeof configurationSchema>;
