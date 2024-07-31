import { type CustomField } from "~/app/types/clickUpApi";

import { atom } from "jotai";

export const hoursPerMonthAtom = atom<CustomField | undefined>(undefined);
