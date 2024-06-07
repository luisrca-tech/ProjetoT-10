import { ChargeOption } from "@/app/types/componentTypes/type";
import { atom } from "jotai";

export const chargeOptionsAtom = atom<ChargeOption[]>([])