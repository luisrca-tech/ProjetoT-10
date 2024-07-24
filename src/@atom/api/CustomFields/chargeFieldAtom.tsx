import { type ChargeFieldType } from "~/app/types/clickUpApi";
import { atom } from "jotai";

export const chargeFieldAtom = atom<ChargeFieldType | null>(null);
