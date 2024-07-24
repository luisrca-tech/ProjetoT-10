import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, type RangeKeyDict } from "react-date-range";
import { ptBR } from "date-fns/locale";
import { Container } from "./styles";
import "./DateRangePicker.css";
import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { stringRowAtom } from "~/@atom/ProjectStates/stringRowAtom";

export function CustomDateRangePicker({}) {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [stringRow] = useAtom(stringRowAtom);

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
