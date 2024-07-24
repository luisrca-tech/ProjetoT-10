import { bebasNeue } from "~/app/fonts";
import { Container } from "./styles";
import { FaUnlockAlt, FaLock } from "react-icons/fa";

import { z } from "zod";
import { type HTMLInputTypeAttribute, useState } from "react";

export const InputSchema = z.object({
  isPassword: z.boolean().optional(),
  label: z.string(),
  value: z.string().optional(),
  type: z.enum([
    "password",
    "email",
    "tel",
    "text",
    "cellphone",
    "cpf",
    "cep",
    "currency",
  ]),
  required: z.boolean().optional(),
});

export type InputProps = z.input<typeof InputSchema> &
  React.InputHTMLAttributes<HTMLInputElement>;

type MaskByType = Partial<
  Record<HTMLInputTypeAttribute, (value: string) => string>
>;

export default function AuthenticationInput({
  isPassword,
  label,
  value,
  ...rest
}: InputProps) {
  InputSchema.parse({
    isPassword,
    label,
    value,
    type: rest.type,
    required: rest.required,
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const maskByType: MaskByType = {
    cep: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
    },
    currency: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d+)(\d{2})$/, "$1,$2")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    cpf: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    },
    cnpj: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    },
    cellphone: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    },
    date: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1");
    },
  };

  const maskValueByType = (
    value?: string | number | readonly string[],
    type?: HTMLInputTypeAttribute
  ) => {
    if (!type) {
      return value;
    }

    if (!value) {
      return "";
    }

    const fn = maskByType[type];
    const result = fn ? fn(String(value)) : value;

    return result;
  };

  return (
    <Container type={rest.type}>
      <label className={bebasNeue.className}>
        {rest.required && !value ? "Campo obrigátorio" : ""}
      </label>
      <div>
        <input
          {...rest}
          value={maskValueByType(value, rest.type)}
          type={passwordIsVisible ? "text" : rest.type}
        ></input>
        {!!isPassword && (
          <button
            type="button"
            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            <div>
              {!!passwordIsVisible ? (
                <FaLock size={22} />
              ) : (
                <FaUnlockAlt size={22} />
              )}
            </div>
          </button>
        )}
      </div>
    </Container>
  );
}
