import { type CustomField } from "~/app/types/clickUpApi";

import { atom } from "jotai";

export const hourValueAtom = atom<CustomField | undefined>(undefined);
