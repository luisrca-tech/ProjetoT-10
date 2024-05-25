// import "rsuite/DateRangePicker/styles/index.css";
// import "./DateRangePicker.css";
// import { Container } from "./styles";

// import React, { useContext, useEffect, useState } from "react";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRangePicker } from "react-date-range";
// import { ptBR } from "date-fns/locale";
// import { ScrolldownContext } from "@/contexts/ScrolldownContext";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// export function CustomDateRangePicker() {
//   const { value, handleSelectDate } = useContext(ScrolldownContext);

//   return (
//     <Container>
//       <DateRangePicker
//         onChange={handleSelectDate}
//         moveRangeOnFirstSelection={false}
//         months={12}
//         ranges={value}
//         direction="vertical"
//         locale={ptBR}
//       />
//     </Container>
//   );
// }
import React, { useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import { ptBR } from "date-fns/locale";
import { Container } from "./styles";
import { addDays } from "date-fns";
import "./DateRangePicker.css";

interface SelectableRange extends Range {
  isSelected?: boolean;
}
interface CustomDateRangePickerProps {
  rowCount: number;
  value: { [key: string]: SelectableRange };
  setValue: React.Dispatch<
    React.SetStateAction<{ [key: string]: SelectableRange }>
  >;
  stringRow: string;
}

export function CustomDateRangePicker({
  rowCount,
  value,
  setValue,
  stringRow,
}: CustomDateRangePickerProps) {
  const currentRange = value[stringRow] || {
    startDate: new Date(),
    endDate: new Date(),
    key: `selection-${stringRow}`,
  };

  const handleSelectDate = (ranges: RangeKeyDict) => {
    if (`selection-${stringRow}` in ranges) {
      const selection = ranges[`selection-${stringRow}`];

      setValue((prevState) => ({
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
