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

interface CustomDateRangePickerProps {
  rowCount: number;
  value: { [key: string]: Range };
  setValue: React.Dispatch<React.SetStateAction<{ [key: string]: Range }>>;
}

export function CustomDateRangePicker({
  rowCount,
  value,
  setValue,
}: CustomDateRangePickerProps) {
  const currentRange = value[`row-${rowCount}`] || {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: `selection-${rowCount}`,
  };

  useEffect(() => {
    console.log(`currentRange`, currentRange);
  }, []);

  const handleSelectDate = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setValue((prevState) => ({
      ...prevState,
      [`row-${rowCount}`]: selection,
    }));
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
