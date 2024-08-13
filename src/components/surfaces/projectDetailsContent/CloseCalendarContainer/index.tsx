"use client";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { Container } from "./styles";
import { useAtom } from "jotai";

export function CloseCalendarContainer() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useAtom(isDatePickerOpenAtom);

  const handleBlurCalendar = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <Container
      isDatePickerOpen={isDatePickerOpen}
      onClick={handleBlurCalendar}
    />
  );
}
