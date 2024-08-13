import { useAtom } from "jotai";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { stringRowAtom } from "~/@atom/ProjectStates/stringRowAtom";

export function useInputDataMenuClick() {
  const [, setIsDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const [, setStringRow] = useAtom(stringRowAtom);

  const handleInputDataMenuClick = (row: string) => {
    setIsDatePickerOpen(true);
    setStringRow(row);
  };
  return { handleInputDataMenuClick };
}
