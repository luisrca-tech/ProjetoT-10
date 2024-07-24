import { useCallback, useEffect, useState } from "react";
import {
  Container,
  InputsRow,
  InputDataMenu,
  DeleteButtonAnimationFrame,
  CalendarDateValues,
} from "./styles";
import Image from "next/image";
import CalendarIcon from "~/../public/calendaricon.svg";
import TrashAnimation from "~/../public/trashanimation.svg";

import SelectInput from "~/app/components/inputs/SelectInput";
import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { rowCountAtom } from "~/@atom/ProjectStates/rowCountAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useGetLastRowIndex } from "~/app/utils/functions/getLastRowIndex";
import { useToggleSelectOpen } from "~/app/utils/functions/toggleSelectedOpen";
import { useIsValueInInput } from "~/app/utils/functions/isValueInInput";
import { useGetInputValueAtIndex } from "~/app/utils/functions/getInputValueAtIndex";
import { useIsSelectOpen } from "~/app/utils/functions/isSelectOpen";
import { poppins } from "~/app/fonts";
import ScrollDownContainer from "~/components/forms/FormSelectInput/components/ScrollDownContainer";

interface RowAndScrollDownContainerProps {
  row: string;
  inputDataMenuClick: (row: string) => void;
}

export default function RowAndScrollDownContainer({
  row,
  inputDataMenuClick,
}: RowAndScrollDownContainerProps) {
  const [checked] = useAtom(checkedAtom);
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [rowCount, setRowCount] = useAtom(rowCountAtom);
  const [rowsAndSelectedValues, setRowsAndSelectedValues] = useAtom(
    rowsAndSelectedValuesAtom
  );

  const [startX, setStartX] = useState<number | null>(null);
  const [offsetXByRow, setOffsetXByRow] = useState<{ [key: string]: number }>(
    {}
  );

  const [isNewRowAdded, setIsNewRowAdded] = useState(false);

  const canAddRow = rowsAndSelectedValues.rows.every((index) => {
    const firstTextValue =
      rowsAndSelectedValues.selectedValues[`firstTextValue${index}-option`];
    const secondTextValue =
      rowsAndSelectedValues.selectedValues[`secondTextValue${index}-text`];
    const thirdTextValue =
      rowsAndSelectedValues.selectedValues[`thirdTextValue${index}-text`];

    return firstTextValue && secondTextValue && thirdTextValue;
  });

  const formatDate = (date: Date | undefined) => {
    return date ? date.toLocaleDateString("pt-BR") : "";
  };

  const lastRowIndex = useGetLastRowIndex();
  const isLastRow = row === lastRowIndex;
  const toggleSelectOpen = useToggleSelectOpen(row);
  const isValueInFirstInput = useIsValueInInput(row, "firstTextValue");
  const isValueInSecondInput = useIsValueInInput(row, "secondTextValue");
  const isValueInThirdInput = useIsValueInInput(row, "thirdTextValue");
  const firstInputValueAtIndex = useGetInputValueAtIndex("firstTextValue", row);
  const secondInputValueAtIndex = useGetInputValueAtIndex(
    "secondTextValue",
    row
  );
  const thirdInputValueAtIndex = useGetInputValueAtIndex("thirdTextValue", row);
  const firstInputIdAtIndex = `firstTextValue${row}-option`;
  const secondInputIdAtIndex = `secondTextValue${row}-text`;
  const thirdInputIdAtIndex = `thirdTextValue${row}-text`;
  const startDateRangeInCurrentRow = formatDate(ranges[row]?.startDate);
  const endDateRangeInCurrentRow = formatDate(ranges[row]?.endDate);
  console.log(ranges, `ranges`);
  console.log(ranges?.[row], `ranges`);
  console.log(row, `row`);

  const isRangeInThisRow =
    isLastRow ||
    (ranges?.[row]?.startDate && ranges?.[row].endDate !== undefined);

  const addRow = useCallback(() => {
    const newDateRange = {
      startDate: undefined,
      endDate: undefined,
      key: `selection-row-${rowCount}`,
      isSelected: false,
    };

    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, `row-${rowCount}`],
    }));

    setRanges((prevState) => ({
      ...prevState,
      [`row-${rowCount}`]: newDateRange,
    }));

    setRowCount((prevCount) => prevCount + 1);
  }, [rowCount, setRanges, setRowCount, setRowsAndSelectedValues]);

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

  function handleInputChange(id: string, value: string) {
    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      selectedValues: {
        ...prevState.selectedValues,
        [`${id}-text`]: value,
      },
    }));
  }

  function handleTouchStartForRow(event: React.TouchEvent, rowIndex: string) {
    if (event.touches[0]) {
      setStartX(event.touches[0].clientX);
    }

    setOffsetXByRow((prevOffsetX) => ({
      ...prevOffsetX,
      [rowIndex]: 0,
    }));
  }

  function handleTouchMove(event: React.TouchEvent, rowIndex: string) {
    if (startX !== null) {
      if (event.touches[0]) {
        const newOffsetX = event.touches[0].clientX - startX;

        if (newOffsetX < 0) {
          setOffsetXByRow((prevState) => ({
            ...prevState,
            [rowIndex]: newOffsetX,
          }));
        }
      }
    }
  }

  const handleTouchEndForRow = (rowIndex: string) => {
    if (offsetXByRow[rowIndex] && Math.abs(offsetXByRow[rowIndex]) > 100) {
      if (rowIndex !== lastRowIndex) {
        removeRow(rowIndex);
      }
    } else {
      setOffsetXByRow((prevOffsetX) => ({
        ...prevOffsetX,
        [rowIndex]: 0,
      }));
    }
    setStartX(null);
  };

  useEffect(() => {
    if (canAddRow && !isNewRowAdded) {
      addRow();
      setIsNewRowAdded(true);
    }
  }, [addRow, canAddRow, isNewRowAdded]);

  return (
    <>
      <Container
        key={row}
        offsetXByRow={offsetXByRow}
        offsetX={offsetXByRow[row]}
        onTouchStart={(e) => handleTouchStartForRow(e, row)}
        onTouchMove={(e) => handleTouchMove(e, row)}
        onTouchEnd={() => handleTouchEndForRow(row)}
        isLastRow={isLastRow}
      >
        <InputsRow checked={checked}>
          <SelectInput
            type="text"
            placeholder="Cargo"
            id={firstInputIdAtIndex}
            hasValue={isValueInFirstInput}
            inputValue={firstInputValueAtIndex}
            setIsSelectOpen={toggleSelectOpen}
            isLastRow={row === lastRowIndex}
            readOnly={true}
          />
          <DeleteButtonAnimationFrame
            onClick={() => removeRow(row)}
            offsetX={offsetXByRow[row] || 0}
            offsetXByRow={offsetXByRow}
            isLastRow={isLastRow}
          >
            <Image src={TrashAnimation} alt="" width={20} height={20} />
          </DeleteButtonAnimationFrame>
          {!checked ? (
            <>
              <SelectInput
                type="number"
                placeholder="Horas"
                id={secondInputIdAtIndex}
                onChange={(value) =>
                  handleInputChange(`secondTextValue${row}`, value)
                }
                hasValue={isValueInSecondInput}
                inputValue={secondInputValueAtIndex}
                isLastRow={isLastRow}
                readOnly={false}
              />
              <SelectInput
                type="number"
                placeholder="Valor Hora"
                id={thirdInputIdAtIndex}
                onChange={(value) =>
                  handleInputChange(`thirdTextValue${row}`, value)
                }
                hasValue={isValueInThirdInput}
                inputValue={thirdInputValueAtIndex}
                isLastRow={isLastRow}
                readOnly={false}
              />
            </>
          ) : (
            <>
              {ranges[row]?.isSelected ? (
                <CalendarDateValues
                  className={poppins.className}
                  onClick={() => inputDataMenuClick(row)}
                >
                  <p>{startDateRangeInCurrentRow}</p>
                  <span>-</span>
                  <p>{endDateRangeInCurrentRow}</p>
                </CalendarDateValues>
              ) : (
                <InputDataMenu
                  className={poppins.className}
                  disabled={isLastRow}
                  isRangeInThisRow={isRangeInThisRow}
                  onClick={() => inputDataMenuClick(row)}
                  isLastRow={isLastRow}
                >
                  <span>Datas</span>
                  <Image
                    src={CalendarIcon}
                    width={24}
                    height={24}
                    alt="Icone de Calendário"
                  />
                </InputDataMenu>
              )}
            </>
          )}
        </InputsRow>
        {useIsSelectOpen(row) && <ScrollDownContainer row={row} />}
      </Container>
    </>
  );
}
