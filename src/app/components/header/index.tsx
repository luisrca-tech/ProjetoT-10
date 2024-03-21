"use client";
import {
  Container,
  ButtonsContainer,
  TitleContainer,
  MenuButton,
  AddProjectButton,
  CloseContainer,
  OptionsContainer,
  ButtonContainer,
  SidebarContainer,
} from "./styles";
import { IoMenu, IoAdd } from "react-icons/io5";
import { poppins } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { IoCloseSharp } from "react-icons/io5";
export default function Header() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleMenu = () => {
    setShowModal((current) => !current);
  };
  useEffect(() => {
    console.log(showModal, `showModal`);
  }, [showModal]);

  return (
    <>
      {showModal && (
        <>
          <Modal onClickCallback={() => setShowModal(false)} />
        </>
      )}
      <SidebarContainer isShow={showModal}>
        <CloseContainer>
          <button onClick={() => setShowModal(false)}>
            <span className={poppins.className}>Fechar</span>
            <IoCloseSharp size={24} />
          </button>
        </CloseContainer>
        <OptionsContainer>
          <ButtonContainer>
            <button className={poppins.className}>Projetos</button>
          </ButtonContainer>
          <ButtonContainer>
            <button className={poppins.className}>Pessoas</button>
          </ButtonContainer>
          <ButtonContainer>
            <button className={poppins.className}>Mobilizados</button>
          </ButtonContainer>
          <ButtonContainer>
            <button className={poppins.className}>Férias</button>
          </ButtonContainer>
        </OptionsContainer>
      </SidebarContainer>
      <Container>
        <ButtonsContainer>
          <MenuButton onClick={handleMenu}>
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
    </>
  );
}
