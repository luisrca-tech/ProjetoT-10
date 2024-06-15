import { atom } from "jotai";

export interface ProjectSelectedValueProps {
  selectedValues: { [key: string]: string };
}

const initialRowsAndSelectedValuesState: ProjectSelectedValueProps = {
  selectedValues: {},
};

export const projectSelectedValuePropAtom = atom(
  initialRowsAndSelectedValuesState,
);
