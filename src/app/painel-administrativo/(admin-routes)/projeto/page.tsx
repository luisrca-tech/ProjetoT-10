import { SelectInputText } from "@/app/components/SelectInputText";
import {
  BackgroundSizeImage,
  Container,
  InputsDataContainer,
  TitleProjectContainer,
} from "./styles";
import { RiPencilFill } from "react-icons/ri";

export default function Projeto() {
  return (
    <Container>
      <TitleProjectContainer>
        <BackgroundSizeImage>P1</BackgroundSizeImage>
        <strong>Projeto exemplo 1</strong>
        <RiPencilFill />
      </TitleProjectContainer>

      <InputsDataContainer>
        <SelectInputText
          optionId={1}
          placeholder="Cargo"
          options={["Back-end SR", "Back-end PL", "Front-end SR"]}
        />
        <SelectInputText placeholder="Horas" optionId={2} />
        <SelectInputText placeholder="Valor" optionId={3} />
      </InputsDataContainer>
    </Container>
  );
}
