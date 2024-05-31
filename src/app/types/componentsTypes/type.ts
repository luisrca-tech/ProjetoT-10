import { ChangeEvent } from "react";
import { Range } from "react-date-range";

export interface SelectableRangeProps extends Range {
  isSelected?: boolean;
}

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}

export interface FormSelectInputProps {
  rowCount: number;
  setRanges: React.Dispatch<
    React.SetStateAction<{ [key: string]: SelectableRangeProps }>
  >;
  setRowCount: React.Dispatch<React.SetStateAction<number>>;
  checked: boolean;
  ranges: { [key: string]: SelectableRangeProps };
  inputDataMenuClick: (row: string) => void;
}

export interface CommonProps extends FormSelectInputProps {
  row: string;
  rowsAndSelectedValues: RowsAndSelectedValueProps;
  setRowsAndSelectedValues: React.Dispatch<
    React.SetStateAction<RowsAndSelectedValueProps>
  >;
}

export interface BudgetContainerProps {
  rowsAndSelectedValues: RowsAndSelectedValueProps;
  ranges: { [key: string]: SelectableRangeProps };
  checked: boolean;
}

export interface RowAndScrollDownContainerProps extends CommonProps {}

export interface BudgetContainerProps {
  rowsAndSelectedValues: RowsAndSelectedValueProps;
}

export interface SelectComponentProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  hasValue: boolean;
}

export interface SelectInputProps {
  id: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasValue: boolean;
  checked: boolean;
  values: { [key: string]: string };
  inputValue: string;
  isSelectOpen?: boolean;
  setIsSelectOpen?: (boolean: boolean) => void;
  value?: string;
  type: string;
}

export interface ProjectProfileHeaderProps {
  ranges: { [key: string]: SelectableRangeProps };
  inputDataMenuClick: (row: string) => void;
  checked: boolean;
}

export type ButtonRegistrationType = {
  text: string;
  loading?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface CustomDateRangePickerProps {
  ranges: { [key: string]: SelectableRangeProps };
  setRanges: React.Dispatch<
    React.SetStateAction<{ [key: string]: SelectableRangeProps }>
  >;
  stringRow: string;
}
