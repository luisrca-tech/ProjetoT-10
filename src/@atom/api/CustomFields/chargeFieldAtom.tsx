import { ChargeFieldType } from "./type";
import { atom } from "jotai";

export const chargeFieldAtom = atom<ChargeFieldType | null>(null);
