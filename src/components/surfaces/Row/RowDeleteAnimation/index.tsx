import { useAtom } from "jotai";
import { Container } from "./styles";
import { useState } from "react";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import TrashAnimation from "public/trashanimation.svg";
import Image from "next/image";
type RowDeleteAnimationProps = {
  isLastRow: boolean;
  row: string;
};
export function RowDeleteAnimation({
  isLastRow,
  row,
}: RowDeleteAnimationProps) {
  const [, setRowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [offsetXByRow] = useState<{ [key: string]: number }>({});
  function removeRow(rowIndex: string) {
    setRowsAndSelectedValues((prevState) => {
      const removedRows = prevState.rows.filter((row) => row !== rowIndex);
      const updatedSelectedValues = { ...prevState.selectedValues };

      Object.keys(updatedSelectedValues).forEach((key) => {
        if (
          key.includes(`firstTextValue${rowIndex}`) ||
          key.includes(`secondTextValue${rowIndex}`) ||
          key.includes(`thirdTextValue${rowIndex}`)
        ) {
          delete updatedSelectedValues[key];
        }
      });

      return {
        rows: removedRows,
        selectedValues: updatedSelectedValues,
      };
    });
  }

  return (
    <Container
      onClick={() => removeRow(row)}
      offsetX={offsetXByRow[row] || 0}
      offsetXByRow={offsetXByRow}
      isLastRow={isLastRow}
      type="button"
    >
      <Image src={TrashAnimation} alt="" width={20} height={20} />
    </Container>
  );
}
