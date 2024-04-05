"use client";
import React, { useEffect, useState } from "react";

interface SelectInputProps {
  id: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    if (
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLInputElement
    ) {
      const newValue = event.target.value;
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <>
      <select id={id} value={value} onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <input type="text" id={id} value={value} onChange={handleChange} />
    </>
  );
};

interface ParentComponentState {
  rows: number[];
  selectedValues: { [key: string]: string };
}

const ParentComponent: React.FC = () => {
  const [state, setState] = useState<ParentComponentState>({
    rows: [0],
    selectedValues: {},
  });

  const handleInputChange = (id: string, value: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedValues: {
        ...prevState.selectedValues,
        [id]: value,
      },
    }));
  };

  const addRow = () => {
    setState((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, prevState.rows.length],
    }));
  };

  const canAddRow = state.rows.every((row, index) => {
    const selectValue = state.selectedValues[`selectInput${index}`];
    const textValue = state.selectedValues[`textInput${index}`];
    return selectValue && textValue;
  });

  useEffect(() => {
    if (canAddRow === false) return;

    addRow();
  }, [canAddRow]);

  return (
    <div>
      {state.rows.map((row, index) => (
        <div key={index} className="row">
          <div className="col">
            <SelectInput
              id={`selectInput${row}`}
              onChange={(value) =>
                handleInputChange(`selectInput${row}`, value)
              }
            />
          </div>
          <div className="col">
            <SelectInput
              id={`textInput${row}`}
              onChange={(value) => handleInputChange(`textInput${row}`, value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParentComponent;
