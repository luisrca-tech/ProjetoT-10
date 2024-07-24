import { type ChargeOptionType } from "~/app/types/clickUpApi";
import { atom } from "jotai";

export const chargeOptionsAtom = atom<ChargeOptionType[]>([]);
