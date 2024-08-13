import { type OptionType } from "~/app/types/clickUpApi";
import { atom } from "jotai";

export const projectOptionsAtom = atom<OptionType[] | undefined>([]);
