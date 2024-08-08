"use client";

import { poppins } from "~/app/fonts";
import { Container, SeparatorContainer } from "./styles";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";
import { useAtom } from "jotai";
import { chargeOptionsAtom } from "~/@atom/api/CustomFields/chargeOptionsAtom";
import { type OptionType } from "~/app/types/clickUpApi";
import ScrollDownOptionButton from "./ScrollDownOptionButton/index";
import { useGetLastRowIndex } from "~/utils/functions/getLastRowIndex";

type ScrollDownContainer = {
  row: string;
};

export default function ScrollDownContainer({ row }: ScrollDownContainer) {
  const [projectOptions] = useAtom(projectOptionsAtom);
  const [chargeOptions] = useAtom(chargeOptionsAtom);

  const currentRow = row ? row : "projectRow";
  const lastRowIndex = useGetLastRowIndex();
  const correctOptions = row === "projectRow" ? projectOptions : chargeOptions;
  const correctOptionsArray: OptionType[] = correctOptions
    ? Object.values(correctOptions)
    : [];

  return (
    <Container
      className={poppins.className}
      onMouseDown={(e) => e.preventDefault()}
    >
      {correctOptionsArray.map((value, index) => (
        <SeparatorContainer
          key={index}
          className={currentRow === lastRowIndex ? "last-row" : ""}
        >
          <ScrollDownOptionButton row={row} value={value} index={index} />
        </SeparatorContainer>
      ))}
    </Container>
  );
}
