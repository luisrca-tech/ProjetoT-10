import { type ProjectOptionType } from "~/app/types/clickUpApi";
import { atom } from "jotai";

export const projectOptionsAtom = atom<ProjectOptionType[]>([]);
