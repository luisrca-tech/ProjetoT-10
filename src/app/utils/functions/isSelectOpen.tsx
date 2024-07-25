import { useAtom } from "jotai";
import { selectedItemIndexAtom } from "~/@atom/ProjectStates/selectedItemIndexAtom";

export function useIsSelectOpen(index: string) {
  const [selectedItemIndex] = useAtom(selectedItemIndexAtom);
  return selectedItemIndex === index;
}
