import { selectedItemIndexAtom } from "~/@atom/ProjectStates/selectedItemIndexAtom";
import { useAtom } from "jotai";

export function useToggleSelectOpen(index: string) {
  const [selectedItemIndex, setSelectedItemIndex] = useAtom(
    selectedItemIndexAtom
  );

  return () => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };
}
