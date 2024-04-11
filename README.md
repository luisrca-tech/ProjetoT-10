# Gestor Integrado de Projetos e Tarefas

O Gestor Integrado de Projetos e Serviços é uma aplicação completa desenvolvida com Next.js, projetada para facilitar o gerenciamento eficiente de projetos, recursos humanos e valores de serviço em organizações. Esta aplicação permite que gestores de tarefas criem e monitorem projetos de forma transparente, atribuindo cargos e senioridades aos membros da equipe e acompanhando o progresso do projeto em tempo real.

## Recursos Principais

- **Gestão de Projetos:** Crie e acompanhe projetos, defina prazos e monitore o progresso geral do projeto.
  
- **Atribuição de Cargos e Senioridades:** Adicione cargos e senioridades aos membros da equipe, atribuindo valor ao serviço de cada funcionário.

- **Integração com ClickUp:** A aplicação está integrada à plataforma ClickUp, permitindo a sincronização de dados entre as duas plataformas em tempo real.

- **Geração de Relatórios:** Ao final de cada projeto, um relatório detalhado é gerado para o cliente, mostrando os cargos envolvidos no projeto, o valor atribuído a cada cargo e o custo final do projeto.

## Tecnologias Utilizadas

- **Next.js:** Framework React para construção de aplicações web modernas e escaláveis.
  
- **React:** Biblioteca JavaScript para criação de interfaces de usuário.
  
- **Node.js:** Ambiente de execução JavaScript que permite executar código JavaScript no servidor.

## Instalação

### Usando npm

1. Clone o repositório:

    ```txt
    git clone https://github.com/P4vanzinho/Projeto-T10.git
    ```

2. Acesse o diretório do projeto:

    ```txt
    cd gestor-integrado-projetos
    ```

3. Instale as dependências:

    ```txt
    npm install
    ```

4. Inicie a aplicação:

    ```txt
    npm run dev
    ```

5. Acesse a aplicação em seu navegador:

    ```txt
    http://localhost:3000
    ```

### Usando Yarn

1. Clone o repositório:

    ```txt
    git clone https://github.com/P4vanzinho/Projeto-T10.git
    ```

2. Acesse o diretório do projeto:

    ```txt
    cd gestor-integrado-projetos
    ```

3. Instale as dependências:

    ```txt
    yarn install
    ```

4. Inicie a aplicação:

    ```txt
    yarn dev
    ```

5. Acesse a aplicação em seu navegador:

    ```txt
    http://localhost:3000
    ```

  ```ts
  "use client";

import { useEffect, useState } from "react";
import {
  Container,
  Header,
  InputsDataContainer,
  InputsRow,
  Footer,
} from "./styles";
import SelectInput from "../SelectInput";
import Image from "next/image";

import { useContext } from "react";
import { ScrolldownContext } from "../../../contexts/ScrolldownContext";

interface ParentComponentState {
  rows: number[];
  selectedValues: { [key: string]: string };
}

export default function FormSelectInput({ checked }: { checked: boolean }) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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
    console.log(selectedValues, selectedValues);
    const textValue = selectedValues[`${inputName}${row}`];

    return textValue !== undefined && textValue.length > 0;
  };

  useEffect(() => {
    if (canAddRow === false) return;

    addRow();
  }, [canAddRow]);

  let offices = {
    office1: "back-end",
    office2: "Front-end",
  };

  const handleButtonClick = (value: string, row: number) => {
    handleInputChange(`firstTextValue${row}`, value);
  };

  return (
    <Container>
      <Header>
        <div>
          <span>Cargos</span>
        </div>
        <div>
          <span>Cargos</span>
        </div>
        <div>
          <span>Cargos</span>
        </div>
      </Header>

      <InputsDataContainer>
        {rowsAndSelectedValues.rows
          .slice()
          .reverse()
          .map((row, index) => (
            <div key={rowsAndSelectedValues.rows.length - 1 - index}>
              <InputsRow checked={checked}>
                <SelectInput
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
                  isSelectOpen={isSelectOpen}
                  setIsSelectOpen={setIsSelectOpen}
                />
                {!checked ? (
                  <>
                    <SelectInput
                      placeholder="Valor"
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
                      placeholder="Horas"
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
                    <input type="date" />
                  </>
                )}
              </InputsRow>
              {isSelectOpen &&
                row ===
                  rowsAndSelectedValues.rows[
                    rowsAndSelectedValues.rows.length - 1
                  ] && (
                  <div className="scrolldown">
                    {Object.values(offices).map((value, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(value, row)}
                      >
                        <span>{value}</span>
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
      </InputsDataContainer>
      <Footer>
        <div>
          <span>Total:</span>
        </div>
        <div>
          <span>1584h</span>
        </div>
        <div>
          <span>178.200,00</span>
        </div>
      </Footer>
    </Container>
  );
}
  ```

```ts
  import { useContext, useEffect, useState } from "react";
import { Container, Input } from "./styles";
import { ScrolldownContext } from "@/contexts/ScrolldownContext";

interface SelectInputProps {
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
}

export default function SelectInput({
  id,
  onChange,
  placeholder,
  hasValue,
  checked,
  values,
  inputValue,
  isSelectOpen,
  setIsSelectOpen,
  value,
}: SelectInputProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    if (
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLInputElement
    ) {
      const newValue = event.target.value;
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  const handleInputFocus = () => {
    if (setIsSelectOpen === undefined) {
      return 
    }
    setIsSelectOpen(true)
  };

  const handleInputBlur = () => {
    if (setIsSelectOpen === undefined) {
      return
    }
    setTimeout(() => {
      setIsSelectOpen(false);
    }, 200);
  };

  return (
    <Container checked={checked}>
      <Input
        onBlur={handleInputBlur}
        autoComplete="off"
        hasValue={hasValue}
        placeholder={placeholder}
        type="text"
        id={id}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleInputFocus}
      />
    </Container>
  );
}

```
