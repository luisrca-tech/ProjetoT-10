"use client";

import { addDays } from "date-fns";
import { ReactNode, createContext, useState, useContext } from "react";
import { Range, RangeKeyDict } from "react-date-range";

interface ScrolldownContextType {
  checked: boolean;
  isDatePickerOpen: boolean;
  hasDateValue: boolean;
  value: Range[];
  handleCheckedChange: () => void;
  toggleDatePicker: () => void;
  toggleEditPicker: () => void;
  handleBlurCalendar: () => void;
  openDatePicker: () => void;
  handleSelectDate: (ranges: RangeKeyDict) => void;
}

export const ScrolldownContext = createContext<ScrolldownContextType>({
  checked: false,
  isDatePickerOpen: false,
  hasDateValue: false,
  value: [],
  handleCheckedChange: () => {},
  toggleDatePicker: () => {},
  toggleEditPicker: () => {},
  handleSelectDate: () => {},
  handleBlurCalendar: () => {},
  openDatePicker: () => {},
});

interface ScrolldownContextProviderProps {
  children: ReactNode;
}

export function ScrolldownContextProvider({
  children,
}: ScrolldownContextProviderProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [hasDateValue, setHasDateValue] = useState<boolean>(false);
  const [value, setValue] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // Funções retiraveis do contexto Começa
  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  const toggleDatePicker = () => {
    checked && setIsDatePickerOpen(!isDatePickerOpen);

    setHasDateValue(!hasDateValue);
  };

  const toggleEditPicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleBlurCalendar = () => {
    setIsDatePickerOpen(false);
  };

  // Funções retiraveis do contexto - Termina

  const handleSelectDate = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    if (selection.startDate && selection.endDate) {
      setValue([selection as Range]);
    }
  };

  return (
    <ScrolldownContext.Provider
      value={{
        checked,
        isDatePickerOpen,
        hasDateValue,
        value,
        toggleDatePicker,
        toggleEditPicker,
        handleSelectDate,
        handleBlurCalendar,
        handleCheckedChange,
        openDatePicker,
      }}
    >
      {children}
    </ScrolldownContext.Provider>
  );
}
