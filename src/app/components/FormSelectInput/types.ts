import { Range } from "react-date-range";

export interface SelectableRange extends Range {
  isSelected?: boolean;
}

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}

export interface FormSelectInputProps {
  setStringRow: React.Dispatch<React.SetStateAction<string>>;
  rowCount: number;
  setRanges: React.Dispatch<
    React.SetStateAction<{ [key: string]: SelectableRange }>
  >;
  setRowCount: React.Dispatch<React.SetStateAction<number>>;
  checked: boolean;
  ranges: { [key: string]: SelectableRange };
  inputDataMenuClick: (row: string) => void;
}

export interface CommonProps extends FormSelectInputProps {
  row: string;
  rowsAndSelectedValues: RowsAndSelectedValueProps;
  setRowsAndSelectedValues: React.Dispatch<
    React.SetStateAction<RowsAndSelectedValueProps>
  >;
}

export interface RowAndScrollDownContainerProps extends CommonProps {}

export interface BudgetContainerProps {
  rowsAndSelectedValues: RowsAndSelectedValueProps;
}
