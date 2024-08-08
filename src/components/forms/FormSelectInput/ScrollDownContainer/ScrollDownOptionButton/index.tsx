import { useAtom } from "jotai";
import { Container } from "./styles";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { type OptionType } from "~/app/types/clickUpApi";
import Image from "next/image";
import AddButton from "public/add.svg";
import { poppins } from "~/app/fonts";

type ScrollDownOptionButtonType = {
  row?: string;
  value: OptionType;
  index: number;
};

export default function ScrollDownOptionButton({
  row,
  value,
  index,
}: ScrollDownOptionButtonType) {
  const currentRow = row ? row : "projectRow";
  const isProjectRow = row === "projectRow";
  const [, setProjectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [, setRowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);

  function handleClick() {
    if (isProjectRow) {
      setProjectSelectedValue((prevState) => ({
        ...prevState,
        selectedValue: {
          ...prevState.selectedValue,
          [`${currentRow}-text`]: value.label || "",
          [`${currentRow}-option`]: value.id,
        },
      }));
    } else {
      setRowsAndSelectedValues((prevState) => ({
        ...prevState,
        selectedValues: {
          ...prevState.selectedValues,
          [`firstTextValue${currentRow}-text`]: value.name || "",
          [`firstTextValue${currentRow}-option`]: `${index}`,
        },
      }));
    }
  }

  return (
    <Container
      type="button"
      onMouseDown={() => {
        handleClick();
      }}
    >
      <Image src={AddButton} alt="" />
      {isProjectRow ? (
        <span className={poppins.className}>{value.label}</span>
      ) : (
        <span className={poppins.className}>{value.name}</span>
      )}
    </Container>
  );
}
