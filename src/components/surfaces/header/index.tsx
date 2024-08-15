"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoAdd, IoCloseSharp, IoMenu } from "react-icons/io5";
import Modal from "../Modal";
import {
  AddProjectButton,
  ButtonContainer,
  ButtonsContainer,
  CloseContainer,
  Container,
  MenuButton,
  OptionsContainer,
  SidebarContainer,
  TitleContainer,
} from "./styles";

// import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
// import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { UserButton } from "@clerk/nextjs";
import { poppins } from "~/assets/fonts/fonts";

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
            <UserButton userProfileMode="navigation" userProfileUrl="" />
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
