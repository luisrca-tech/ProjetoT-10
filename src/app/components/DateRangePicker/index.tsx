import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePickerStyles.css"; // Importando os estilos customizados
import { Locale } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function CustomDatePicker(): JSX.Element {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  function handleStartDateChange(date: Date | null) {
    setStartDate(date);
  }

  function handleEndDateChange(date: Date | null) {
    setEndDate(date);
  }

  return (
    <div className="date-picker-container">
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Data de início"
          locale={ptBR}
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Data de término"
          locale={ptBR}
        />
      </div>
    </div>
  );
}
