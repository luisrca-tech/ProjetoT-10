import { atom } from "jotai";

export interface ProjectSelectedValueProps {
  selectedValue: { [key: string]: string };
}

const initialProjectSelectedValueState: ProjectSelectedValueProps = {
  selectedValue: {},
};

export const projectSelectedValuePropAtom = atom(
  initialProjectSelectedValueState
);
