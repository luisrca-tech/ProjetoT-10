import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { poppins } from "~/assets/fonts/fonts";
import { Container, Input } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { numberValueInputSchema } from "~/schemas/number-value-input.schema";
import { type numberValueData } from "~/types/work-value-input.type";
import { useGetInputValueAtIndex } from "~/utils/functions/getInputValueAtIndex";
import { useGetLastRowIndex } from "~/utils/functions/getLastRowIndex";

interface NumberValueInputProps {
  onChange?: (value: string) => void;
  isLastRow?: boolean;
  row?: string;
  textValueType?: string;
}

export default function NumberValueInput({
  onChange,
  row,
  textValueType,
}: NumberValueInputProps) {
  const [checked] = useAtom(checkedAtom);
  const inputValue = useGetInputValueAtIndex(textValueType, row);
  const lastRowIndex = useGetLastRowIndex();
  const isLastRow = row === lastRowIndex;

  const {
    control,
    formState: { errors },
    setValue,
  } = useForm<numberValueData>({
    resolver: zodResolver(numberValueInputSchema),
    mode: "onChange",
    defaultValues: {
      numberValue: inputValue || "",
    },
  });

  const hasValue = !errors.numberValue;

  const handleChange = (value: string) => {
    setValue("numberValue", value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Container checked={checked}>
      <Controller
        name="numberValue"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Horas"
            type="text"
            id={textValueType}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^\d*\.?\d*$/;

              if (regex.test(value)) {
                field.onChange(e);
                handleChange(value);
              }
            }}
            className={poppins.className}
            showError={!hasValue}
            isLastRow={isLastRow}
          />
        )}
      />
    </Container>
  );
}
