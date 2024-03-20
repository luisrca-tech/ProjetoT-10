"use client";
import {
  Container,
  ButtonsContainer,
  TitleContainer,
  MenuButton,
  AddProjectButton,
} from "./styles";
import { IoMenu, IoAdd } from "react-icons/io5";
import { poppins } from "@/app/fonts";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  return (
    <Container>
      <ButtonsContainer>
        <MenuButton>
          <IoMenu size={24} />
        </MenuButton>
      </ButtonsContainer>
      <TitleContainer className={poppins.className}>
        <h1>Projetos</h1>
      </TitleContainer>
      <ButtonsContainer>
        <AddProjectButton
          type="button"
          onClick={() => router.push("/painel-administrativo/projeto")}
        >
          <IoAdd size={24} />
        </AddProjectButton>
      </ButtonsContainer>
    </Container>
  );
}
