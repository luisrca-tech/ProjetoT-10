import { z } from "zod";

const OptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type OptionType = z.infer<typeof OptionSchema>;

export interface SelectInputTextProps {
  placeholder?: string;
  options: OptionType[];
  type: "number" | "text";
}

export const SelectInputTextSchema = z.object({
  placeholder: z.string().optional(),
  type: z.enum(["number", "text"]),
  query: z.string().optional(),
  hasPrefix: z.boolean().optional(),
});

export type SelectInputProps = z.infer<typeof SelectInputTextSchema>;
