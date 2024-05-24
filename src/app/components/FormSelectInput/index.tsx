"use client";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Header,
  InputsDataContainer,
  InputsRow,
  Footer,
  ScrollDownContainer,
  SeparatorContainer,
  EditDateContainer,
  BudgetContainer,
  RowAndScrollDownContainer,
  InputDataMenu,
  DeleteButtonAnimationFrame,
  HeaderContent,
} from "./styles";
import Image from "next/image";
import { poppins } from "@/app/fonts";

import AddButton from "../../../../public/add.svg";
import CalendarIcon from "../../../../public/calendaricon.svg";
import TrashAnimation from "../../../../public/trashanimation.svg";
import SelectInput from "../SelectInput";
import { ScrolldownContext } from "@/contexts/ScrolldownContext";
import { addDays } from "date-fns";
import { Range } from "react-date-range";

interface ParentComponentState {
  rows: string[];
  selectedValues: { [key: string]: string };
}

let offices = {
  office1: "Back-End PL",
  office2: "Back-End SR",
  office3: "Front-End PL",
  office4: "Front-End SR",
};

interface FormSelectInputProps {
  checked: boolean;
  setValue: React.Dispatch<React.SetStateAction<{ [key: string]: Range }>>;
  setRowCount: React.Dispatch<React.SetStateAction<number>>;
  rowCount: number;
}

export default function FormSelectInput({
  checked,
  setValue,
  setRowCount,
  rowCount,
}: FormSelectInputProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<string | null>(
    null,
  );
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [offsetXByRow, setOffsetXByRow] = useState<{ [key: string]: number }>(
    {},
  );
  const [rowsAndSelectedValues, setRowsAndSelectedValues] =
    useState<ParentComponentState>({
      rows: ["row-0"],
      selectedValues: {},
    });

  const { isDatePickerOpen, openDatePicker } = useContext(ScrolldownContext);

  // Função para abrir ou fechar o item na posição especificada
  const toggleSelectOpen = (index: string) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };

  // Verifica se o item na posição 'index' está aberto
  const isSelectOpen = (index: string) => {
    return selectedItemIndex === index;
  };

  function InputDataMenuClick(row: string) {
    openDatePicker();
    console.log(`rowCount`, rowCount);
    setRowCount(Number(row));
    console.log(`rowCount`, rowCount);
  }

  function handleInputChange(id: string, value: string) {
    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      selectedValues: {
        ...prevState.selectedValues,
        [id]: value,
      },
    }));
  }

  function addRow() {
    // const newRowId = `row-${Date.now()}`;
    const newDateRange = {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: `selection-${rowCount}`,
    };

    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, `row-${rowCount}`],
    }));

    setValue((prevState) => ({
      ...prevState,
      [`row-${rowCount}`]: newDateRange,
    }));

    setRowCount((prevCount) => prevCount + 1);
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

  const canAddRow = rowsAndSelectedValues.rows.every((index) => {
    const firstTextValue =
      rowsAndSelectedValues.selectedValues[`firstTextValue${index}`];
    const secondTextValue =
      rowsAndSelectedValues.selectedValues[`secondTextValue${index}`];
    const thirdTextValue =
      rowsAndSelectedValues.selectedValues[`thirdTextValue${index}`];

    return firstTextValue && secondTextValue && thirdTextValue;
  });

  useEffect(() => {
    if (canAddRow === false) return;

    addRow();
  }, [canAddRow]);

  const isValueInInput = (row: string, inputName: string) => {
    const { selectedValues } = rowsAndSelectedValues;
    const textValue = selectedValues[`${inputName}${row}`];

    return textValue !== undefined && textValue.length > 0;
  };

  const handleButtonClick = (value: string, row: string) => {
    handleInputChange(`firstTextValue${row}`, value);
  };

  useEffect(() => {
    let totalHoursSum = 0;
    let totalValueSum = 0;

    rowsAndSelectedValues.rows.forEach((index) => {
      const hours = parseInt(
        rowsAndSelectedValues.selectedValues[`secondTextValue${index}`] || "0",
        10,
      );
      const value = parseInt(
        rowsAndSelectedValues.selectedValues[`thirdTextValue${index}`] || "0",
        10,
      );

      totalHoursSum += hours;
      totalValueSum += value;
    });

    setTotalHours(totalHoursSum);
    setTotalValue(totalValueSum);
  }, [rowsAndSelectedValues]);

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
      // Permitir o arrasto apenas para a esquerda
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
      removeRow(rowIndex);
    } else {
      // Restaura a posição inicial
      setOffsetXByRow((prevOffsetX) => ({
        ...prevOffsetX,
        [rowIndex]: 0,
      }));
    }
    setStartX(null);
  };

  return (
    <Container>
      <Header checked={checked}>
        {!checked ? (
          <>
            <HeaderContent>
              <span className="FristRole">Cargo</span>

              <span>Horas/mês</span>

              <span>Valor Hora</span>
            </HeaderContent>
          </>
        ) : (
          <EditDateContainer>
            <span className="FristRole">Cargo</span>

            <span>Data de trabalho</span>
          </EditDateContainer>
        )}
      </Header>

      <InputsDataContainer>
        {rowsAndSelectedValues.rows
          .slice()
          .reverse()
          .map((row) => (
            <RowAndScrollDownContainer
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
                  onChange={(value) =>
                    handleInputChange(`firstTextValue${row}`, value)
                  }
                  hasValue={isValueInInput(row, "firstTextValue")}
                  checked={checked}
                  values={offices}
                  inputValue={
                    rowsAndSelectedValues.selectedValues[`firstTextValue${row}`]
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
                      checked={checked}
                      values={offices}
                      inputValue={
                        rowsAndSelectedValues.selectedValues[
                          `secondTextValue${row}`
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
                      checked={checked}
                      values={offices}
                      inputValue={
                        rowsAndSelectedValues.selectedValues[
                          `thirdTextValue${row}`
                        ]
                      }
                    />
                  </>
                ) : (
                  <>
                    <InputDataMenu onClick={() => InputDataMenuClick(row)}>
                      <span>Datas</span>
                      <Image
                        src={CalendarIcon}
                        width={24}
                        height={24}
                        alt="Icone de Calendário"
                      />
                    </InputDataMenu>
                  </>
                )}
              </InputsRow>
              {isSelectOpen(row) && (
                // Atualizado para chamar a função 'isSelectOpen' com o índice atual
                <ScrollDownContainer
                  className={poppins.className}
                  onMouseDown={(e) => e.preventDefault()} // onMouseDown previne a perda do foco que acontece dentro de onClick, e.preventDefault impede que o foco seja perido.
                >
                  {Object.values(offices).map((value, index) => (
                    <SeparatorContainer
                      key={index}
                      className={row === getLastRowIndex() ? "last-row" : ""}
                    >
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault(); // Previne a perda de foco
                          handleButtonClick(value, row);
                        }}
                      >
                        <Image src={AddButton} alt="" />
                        <span>{value}</span>
                      </button>
                    </SeparatorContainer>
                  ))}
                </ScrollDownContainer>
              )}
            </RowAndScrollDownContainer>
          ))}
      </InputsDataContainer>
      <Footer>
        <BudgetContainer className={poppins.className}>
          <span>Total:</span>
        </BudgetContainer>
        <BudgetContainer>
          <span>{`${totalHours}h`}</span>
        </BudgetContainer>
        <BudgetContainer>
          <span>{`R$${totalValue},00`}</span>
        </BudgetContainer>
      </Footer>
    </Container>
  );
}
