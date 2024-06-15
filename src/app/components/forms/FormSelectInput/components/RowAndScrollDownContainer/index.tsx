"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Container,
  InputsRow,
  InputDataMenu,
  DeleteButtonAnimationFrame,
  CalendarDateValues,
} from "./styles";
import Image from "next/image";

import ScrollDownContainer from "../ScrollDownContainer";
import CalendarIcon from "../../../../../../../public/calendaricon.svg";
import TrashAnimation from "../../../../../../../public/trashanimation.svg";
import SelectInput from "@/app/components/inputs/SelectInput";

import { useAtom } from "jotai";
import { rangesAtom } from "@/@atom/ProjectStates/rangesAtom";
import { checkedAtom } from "@/@atom/ProjectStates/checkedAtom";
import { rowCountAtom } from "@/@atom/ProjectStates/rowCountAtom";
import { rowsAndSelectedValuesAtom } from "@/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { chargeOptionsAtom } from "@/@atom/api/CustomFields/chargeOptionsAtom";

let offices = {
  office1: "Back-End PL",
  office2: "Back-End SR",
  office3: "Front-End PL",
  office4: "Front-End SR",
};

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
    rowsAndSelectedValuesAtom,
  );

  const [selectedItemIndex, setSelectedItemIndex] = useState<string | null>(
    null,
  );
  const [startX, setStartX] = useState<number | null>(null);
  const [offsetXByRow, setOffsetXByRow] = useState<{ [key: string]: number }>(
    {},
  );

  const [isNewRowAdded, setIsNewRowAdded] = useState(false);

  const canAddRow = rowsAndSelectedValues.rows.every((index) => {
    const firstTextValue =
      rowsAndSelectedValues.selectedValues[`firstTextValue${index}-text`];
    const secondTextValue =
      rowsAndSelectedValues.selectedValues[`secondTextValue${index}-text`];
    const thirdTextValue =
      rowsAndSelectedValues.selectedValues[`thirdTextValue${index}-text`];

    return firstTextValue && secondTextValue && thirdTextValue;
  });

  const addRow = useCallback(() => {
    const newDateRange = {
      startDate: new Date(),
      endDate: new Date(),
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

  const toggleSelectOpen = (index: string) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };

  const isValueInInput = (row: string, inputName: string) => {
    const { selectedValues } = rowsAndSelectedValues;
    const textValue = selectedValues[`${inputName}${row}`];

    return textValue !== undefined && textValue.length > 0;
  };

  const isSelectOpen = (index: string) => {
    return selectedItemIndex === index;
  };

  function handleInputChange(id: string, value: string, index?: number) {
    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      selectedValues: {
        ...prevState.selectedValues,
        [`${id}-text`]: value,
        [`${id}-option`]: `${index}`,
      },
    }));
  }

  const handleTouchStartForRow = (
    event: React.TouchEvent,
    rowIndex: string,
  ) => {
    setStartX(event.touches[0].clientX);
    setOffsetXByRow((prevOffsetX) => ({
      ...prevOffsetX,
      [rowIndex]: 0,
    }));
  };

  const handleTouchMove = (event: React.TouchEvent, rowIndex: string) => {
    if (startX !== null) {
      const newOffsetX = event.touches[0].clientX - startX;
      if (newOffsetX < 0) {
        setOffsetXByRow((prevState) => ({
          ...prevState,
          [rowIndex]: newOffsetX,
        }));
      }
    }
  };

  const getLastRowIndex = () => {
    const rows = rowsAndSelectedValues.rows;
    return rows[rows.length - 1];
  };

  const handleTouchEndForRow = (rowIndex: string) => {
    if (offsetXByRow[rowIndex] && Math.abs(offsetXByRow[rowIndex]) > 100) {
      if (rowIndex !== getLastRowIndex()) {
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

  const formatDate = (date: Date | undefined) => {
    return date ? date.toLocaleDateString("pt-BR") : "";
  };

  useEffect(() => {
    if (canAddRow && !isNewRowAdded) {
      addRow();
      setIsNewRowAdded(true);
    }
  }, [addRow, canAddRow, isNewRowAdded]);

  return (
    <Container
      key={row}
      offsetXByRow={offsetXByRow}
      offsetX={offsetXByRow[row]}
      onTouchStart={(e) => handleTouchStartForRow(e, row)}
      onTouchMove={(e) => handleTouchMove(e, row)}
      onTouchEnd={() => handleTouchEndForRow(row)}
      isLastRow={row === getLastRowIndex()}
    >
      <InputsRow checked={checked}>
        <SelectInput
          type="text"
          placeholder="Cargo"
          id={`firstTextValue${row}`}
          onChange={(value) => handleInputChange(`firstTextValue${row}`, value)}
          hasValue={isValueInInput(row, "firstTextValue")}
          inputValue={
            rowsAndSelectedValues.selectedValues[`firstTextValue${row}-text`]
          }
          setIsSelectOpen={() => toggleSelectOpen(row)}
        />
        <DeleteButtonAnimationFrame
          onClick={() => removeRow(row)}
          offsetX={offsetXByRow[row] || 0}
          offsetXByRow={offsetXByRow}
          isLastRow={row === getLastRowIndex()}
        >
          <Image src={TrashAnimation} alt="" width={20} height={20} />
        </DeleteButtonAnimationFrame>
        {!checked ? (
          <>
            <SelectInput
              type="number"
              placeholder="Horas"
              id={`secondTextValue${row}`}
              onChange={(value) =>
                handleInputChange(`secondTextValue${row}`, value)
              }
              hasValue={isValueInInput(row, "secondTextValue")}
              inputValue={
                rowsAndSelectedValues.selectedValues[
                  `secondTextValue${row}-text`
                ]
              }
            />
            <SelectInput
              type="number"
              placeholder="Valor Hora"
              id={`thirdTextValue${row}`}
              onChange={(value) =>
                handleInputChange(`thirdTextValue${row}`, value)
              }
              hasValue={isValueInInput(row, "thirdTextValue")}
              inputValue={
                rowsAndSelectedValues.selectedValues[
                  `thirdTextValue${row}-text`
                ]
              }
            />
          </>
        ) : (
          <>
            {ranges[row].isSelected ? (
              <CalendarDateValues onClick={() => inputDataMenuClick(row)}>
                <p>{formatDate(ranges[row].startDate)}</p>
                <span>-</span>
                <p>{formatDate(ranges[row].endDate)}</p>
              </CalendarDateValues>
            ) : (
              <InputDataMenu onClick={() => inputDataMenuClick(row)}>
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
      {isSelectOpen(row) && <ScrollDownContainer row={row} />}
    </Container>
  );
}
