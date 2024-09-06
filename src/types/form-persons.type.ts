import { type z } from "zod";
import { type formPersonsSchema } from "~/schemas/form-persons.schema";

export type formPersonsData = z.infer<typeof formPersonsSchema>;
