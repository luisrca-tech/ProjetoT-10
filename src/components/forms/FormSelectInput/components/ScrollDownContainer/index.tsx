"use client";

import { Container, SeparatorContainer } from "./styles";
import { useAtom } from "jotai";
import AddButton from "/public/images/add.svg";
import Image, { type StaticImageData } from "next/image";
import { chargeOptionsAtom } from "~/@atom/api/CustomFields/chargeOptionsAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { poppins } from "~/assets/fonts/fonts";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";

type ScrollDownContainer = {
  row: string;
};

interface handleInputChange {
  valueLabel?: string;
  valueCharge?: string;
  optionId?: string;
  index?: number;
}

export default function ScrollDownContainer({ row }: ScrollDownContainer) {
  const [projectOptions] = useAtom(projectOptionsAtom);
  const [chargeOptions] = useAtom(chargeOptionsAtom);
  const [rowsAndSelectedValues, setRowsAndSelectedValues] = useAtom(
    rowsAndSelectedValuesAtom
  );
  const currentRow = row ? row : "projectRow";
  const correctOptions = row === "projectRow" ? projectOptions : chargeOptions;

  const [, setProjectSelectedValue] = useAtom(projectSelectedValuePropAtom);

  function getLastRowIndex() {
    const rows = rowsAndSelectedValues.rows;
    return rows[rows.length - 1];
  }

  function handleInputChange({
    valueLabel,
    valueCharge,
    optionId,
    index,
  }: handleInputChange) {
    if (currentRow === "projectRow") {
      setProjectSelectedValue((prevState) => ({
        ...prevState,
        selectedValue: {
          ...prevState.selectedValue,
          [`${currentRow}-text`]: valueLabel || "",
          [`${currentRow}-option`]: `${optionId}`,
        },
      }));
    } else {
      setRowsAndSelectedValues((prevState) => ({
        ...prevState,
        selectedValues: {
          ...prevState.selectedValues,
          [`firstTextValue${currentRow}-text`]: valueCharge || "",
          [`firstTextValue${currentRow}-option`]: `${index}`,
        },
      }));
    }
  }

  function handleButtonClick(
    valueLabel?: string,
    valueCharge?: string,
    optionId?: string,
    index?: number
  ) {
    handleInputChange({ valueLabel, valueCharge, optionId, index });
  }
  return (
    <Container
      className={poppins.className}
      onMouseDown={(e) => e.preventDefault()}
    >
      {Object.values(correctOptions).map((value, index) => (
        <SeparatorContainer
          key={index}
          className={currentRow === getLastRowIndex() ? "last-row" : ""}
        >
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleButtonClick(value.label, value.name, value.id, index);
            }}
          >
            <Image src={AddButton as StaticImageData} alt="" />
            {row === "projectRow" ? (
              <span className={poppins.className}>{value.label}</span>
            ) : (
              <span className={poppins.className}>{value.name}</span>
            )}
          </button>
        </SeparatorContainer>
      ))}
    </Container>
  );
}
