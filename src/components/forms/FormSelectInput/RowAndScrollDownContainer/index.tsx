import { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  InputsRow,
  InputDataMenu,
  DeleteButtonAnimationFrame,
  CalendarDateValues,
} from "./styles";
import Image from "next/image";
import CalendarIcon from "public/calendaricon.svg";
import TrashAnimation from "public/trashanimation.svg";
import { v4 as uuidv4 } from "uuid";
import SelectInput from "~/components/inputs/SelectInput";
import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useGetLastRowIndex } from "~/app/utils/functions/getLastRowIndex";
import { useToggleSelectOpen } from "~/app/utils/functions/toggleSelectedOpen";
import { useIsValueInInput } from "~/app/utils/functions/isValueInInput";
import { useGetInputValueAtIndex } from "~/app/utils/functions/getInputValueAtIndex";
import { useIsSelectOpen } from "~/app/utils/functions/isSelectOpen";
import { poppins } from "~/app/fonts";
import ScrollDownContainer from "~/components/forms/FormSelectInput/ScrollDownContainer";
import { useInputDataMenuClick } from "~/utils/functions/inputDataMenuClick";

interface RowAndScrollDownContainerProps {
  row: string;
}

export default function RowAndScrollDownContainer({
  row,
}: RowAndScrollDownContainerProps) {
  const isNewRowAddedRef = useRef(false); // Ref para rastrear se a linha já foi adicionada
  const [checked] = useAtom(checkedAtom);
  const [ranges, setRanges] = useAtom(rangesAtom);

  const [rowsAndSelectedValues, setRowsAndSelectedValues] = useAtom(
    rowsAndSelectedValuesAtom
  );
  const { handleInputDataMenuClick } = useInputDataMenuClick();
  const [startX, setStartX] = useState<number | null>(null);
  const [offsetXByRow, setOffsetXByRow] = useState<{ [key: string]: number }>(
    {}
  );
  const [isRowAdded, setIsRowAdded] = useState<boolean | null>(false);

  const canAddRow = useCallback(() => {
    const lastIndex =
      rowsAndSelectedValues.rows[rowsAndSelectedValues.rows.length - 1];
    const firstTextValue =
      rowsAndSelectedValues.selectedValues[`firstTextValue${lastIndex}-option`];
    const secondTextValue =
      rowsAndSelectedValues.selectedValues[`secondTextValue${lastIndex}-text`];
    const thirdTextValue =
      rowsAndSelectedValues.selectedValues[`thirdTextValue${lastIndex}-text`];
    return firstTextValue && secondTextValue && thirdTextValue;
  }, [rowsAndSelectedValues.rows, rowsAndSelectedValues.selectedValues]);

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

  const isRangeInThisRow =
    isLastRow ||
    (ranges?.[row]?.startDate && ranges?.[row].endDate !== undefined);

  const addRow = useCallback(() => {
    const rowKey = uuidv4();
    const newDateRange = {
      startDate: undefined,
      endDate: undefined,
      key: `selection-row-${rowKey}`,
      isSelected: false,
    };

    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, `row-${rowKey}`],
    }));

    setRanges((prevState) => ({
      ...prevState,
      [`row-${rowKey}`]: newDateRange,
    }));
  }, [setRanges, setRowsAndSelectedValues]);

  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }

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

  function handleTouchEndForRow(rowIndex: string) {
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
  }

  useEffect(() => {
    if (canAddRow() && !isNewRowAddedRef.current) {
      addRow();
      isNewRowAddedRef.current = true;
    }
  }, [canAddRow, addRow]);

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
            type="button"
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
                  onClick={() => handleInputDataMenuClick(row)}
                  type="button"
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
                  onClick={() => handleInputDataMenuClick(row)}
                  isLastRow={isLastRow}
                  type="button"
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
