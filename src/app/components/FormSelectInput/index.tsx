"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Header,
  InputsDataContainer,
  InputsRow,
  Footer,
  ScrollDownContainer,
  SeparatorContainer,
  HeaderContent,
  BudgetContainer,
  RowAndScrollDownContainer,
  InputDataMenu,
} from "./styles";

import SelectInput from "../SelectInput";
import Image from "next/image";
import { poppins } from "@/app/fonts";

import AddButton from "../../../../public/add.svg";
import CalendarIcon from "../../../../public/calendaricon.svg";
import DateRangePickerInput from "../DateRangePicker";

interface ParentComponentState {
  rows: number[];
  selectedValues: { [key: string]: string };
}

let offices = {
  office1: "Back-End PL",
  office2: "Back-End SR",
  office3: "Front-End PL",
  office4: "Front-End SR",
};

export default function FormSelectInput({ checked }: { checked: boolean }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );
  const [lastRowIndex, setLastRowIndex] = useState<number | null>(null);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  // Função para abrir ou fechar o item na posição especificada
  const toggleSelectOpen = (index: number) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };

  // Verifica se o item na posição 'index' está aberto
  const isSelectOpen = (index: number) => {
    return selectedItemIndex === index;
  };

  const [rowsAndSelectedValues, setRowsAndSelectedValues] =
    useState<ParentComponentState>({
      rows: [0],
      selectedValues: {},
    });

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
    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, prevState.rows.length],
    }));
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

  const isValueInInput = (row: number, inputName: string) => {
    const { selectedValues } = rowsAndSelectedValues;
    const textValue = selectedValues[`${inputName}${row}`];

    return textValue !== undefined && textValue.length > 0;
  };

  const handleButtonClick = (value: string, row: number) => {
    handleInputChange(`firstTextValue${row}`, value);
  };

  useEffect(() => {
    if (canAddRow === false) return;

    addRow();
  }, [canAddRow]);

  useEffect(() => {
    let totalHoursSum = 0;
    let totalValueSum = 0;

    // Itero com as linhas a partir de rows e crio variaveis transformando-as em números inteiros decimais,
    // Pego o index do segundo e terceiro input, Horas e valor e defino 0 se não houver valor.
    // igualo totalHoursSum e totalValueSum as minhas constantes ja que o valor vai ser modificado e após altero o estado respectivamente.

    rowsAndSelectedValues.rows.forEach((index) => {
      const hours = parseInt(
        rowsAndSelectedValues.selectedValues[`secondTextValue${index}`] || "0",
        10, // 10 é o segundo argumento que o javaScript recebe em parseInt, ele serve para garantir que o numero obtido no valor é decimal
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
  }, [rowsAndSelectedValues]); // rowsAndSelectedValues como dependencia garante que os valores vão se alterar cada vez que esse argumento mudar.

  useEffect(() => {
    // Encontrar o índice da última linha
    const lastIndex = Object.values(offices).length - 0;
    setLastRowIndex(lastIndex);
  }, []);

  return (
    <Container>
      <Header checked={checked}>
        {!checked ? (
          <>
            <HeaderContent>
              <span className="FristRole">Cargo</span>
            </HeaderContent>
            <HeaderContent>
              <span>Horas/mês</span>
            </HeaderContent>
            <HeaderContent>
              <span>Valor Hora</span>
            </HeaderContent>
          </>
        ) : (
          <>
            <HeaderContent>
              <span className="FristRole">Cargo</span>
            </HeaderContent>
            <HeaderContent>
              <span>Data de trabalho</span>
            </HeaderContent>
          </>
        )}
      </Header>

      <InputsDataContainer>
        {rowsAndSelectedValues.rows
          .slice()
          .reverse()
          .map((row, index) => (
            <RowAndScrollDownContainer
              key={rowsAndSelectedValues.rows.length - 1 - index}
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
                  setIsSelectOpen={() => toggleSelectOpen(index)}
                />
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
                      placeholder="Valor"
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
                    <InputDataMenu>
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
              {isSelectOpen(index) && (
                // Atualizado para chamar a função 'isSelectOpen' com o índice atual
                <ScrollDownContainer
                  className={poppins.className}
                  onMouseDown={(e) => e.preventDefault()} // onMouseDown previne a perda do foco que acontece dentro de onClick, e.preventDefault impede que o foco seja perido.
                >
                  {Object.values(offices).map((value, index) => (
                    <SeparatorContainer
                      key={index}
                      className={index === lastRowIndex ? "last-row" : ""}
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
