"use client";
import {
  Container,
  ButtonsContainer,
  MenuButton,
  CloseContainer,
  OptionsContainer,
  ButtonContainer,
  SidebarContainer,
  TitleContainer,
  AddProjectButton,
} from "./styles";
import { IoMenu, IoAdd } from "react-icons/io5";
import { poppins } from "~/app/fonts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal";
import { IoCloseSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = usePathname();

  const handleMenu = () => {
    setShowModal((current) => !current);
  };

  const isAuthPage = () => {
    return currentPath.startsWith("/painel-administrativo/autenticacao");
  };

  const isProjectsPage = currentPath.startsWith(
    "/painel-administrativo/projetos"
  )
    ? true
    : false;

  const noRenderIconsAndSidebar = () => {
    if (isAuthPage()) {
      return (
        <>
          <Container isAutentication={true}>
            <TitleContainer className={poppins.className}>
              <h1>Pixel Craft</h1>
            </TitleContainer>
          </Container>
        </>
      );
    }
    return null;
  };

  const renderIconsAndSidebar = () => {
    if (!isAuthPage()) {
      return (
        <>
          <SidebarContainer isShow={showModal}>
            <UserButton />
            <CloseContainer>
              <button onClick={() => setShowModal(false)}>
                <span className={poppins.className}>Fechar</span>
                <IoCloseSharp size={24} />
              </button>
            </CloseContainer>
            <OptionsContainer>
              <ButtonContainer>
                <button
                  onClick={() => router.push("/painel-administrativo/projetos")}
                  className={poppins.className}
                >
                  Projetos
                </button>
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
          <Container isAutentication={false}>
            <ButtonsContainer>
              <MenuButton onClick={handleMenu}>
                <IoMenu size={24} />
              </MenuButton>
            </ButtonsContainer>
            <TitleContainer className={poppins.className}>
              <h1>Projetos</h1>
            </TitleContainer>
            <ButtonsContainer>
              {!!isProjectsPage && (
                <AddProjectButton
                  onClick={() => router.push("/painel-administrativo/projeto")}
                >
                  <IoAdd size={24} />
                </AddProjectButton>
              )}
            </ButtonsContainer>
          </Container>
        </>
      );
    }
    return null;
  };

  return (
    <>
      {showModal && <Modal onClickCallback={() => setShowModal(false)} />}
      {noRenderIconsAndSidebar()}
      {renderIconsAndSidebar()}
    </>
  );
}
