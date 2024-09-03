import { type OptionType } from "~/server/types/Clickup.type";
import { atom } from "jotai";

export const chargeOptionsAtom = atom<OptionType[] | undefined>([]);
