import { type OptionType } from "~/app/types/clickUpApi";
import { atom } from "jotai";

export const chargeOptionsAtom = atom<OptionType[] | undefined>([]);
