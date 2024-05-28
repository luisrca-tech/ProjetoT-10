import React from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import { ptBR } from "date-fns/locale";
import { Container } from "./styles";
import { SelectableRangeProps } from "@/app/types/componentsTypes/type";

import "./DateRangePicker.css";

interface CustomDateRangePickerProps {
  rowCount: number;
  ranges: { [key: string]: SelectableRangeProps };
  setRanges: React.Dispatch<
    React.SetStateAction<{ [key: string]: SelectableRangeProps }>
  >;
  stringRow: string;
}

export function CustomDateRangePicker({
  ranges,
  setRanges,
  stringRow,
}: CustomDateRangePickerProps) {
  const currentRange = ranges[stringRow] || {
    startDate: new Date(),
    endDate: new Date(),
    key: `selection-${stringRow}`,
  };

  const handleSelectDate = (ranges: RangeKeyDict) => {
    if (`selection-${stringRow}` in ranges) {
      const selection = ranges[`selection-${stringRow}`];

      setRanges((prevState) => ({
        ...prevState,
        [stringRow]: {
          ...selection,
          isSelected: true,
        },
      }));
    } else {
    }
  };

  return (
    <Container>
      <DateRangePicker
        onChange={handleSelectDate}
        moveRangeOnFirstSelection={false}
        months={12}
        ranges={[currentRange]}
        direction="vertical"
        locale={ptBR}
      />
    </Container>
  );
}
