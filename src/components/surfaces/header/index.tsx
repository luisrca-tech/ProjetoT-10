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
  PostTaskCheckButton,
  UpdateTaskCheckButton,
} from "./styles";
import { IoMenu, IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal";
import { IoCloseSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { RiCheckFill } from "react-icons/ri";

import { useAtom } from "jotai";
import {
  rangesAtom,
  type SelectableRangeProps,
} from "~/@atom/ProjectStates/rangesAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
// import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
// import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { poppins } from "~/assets/fonts/fonts";

export default function Header() {
  const [ranges] = useAtom(rangesAtom);
  // const [loading, setLoading] = useAtom(loadingAtom);
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [fieldsIds] = useAtom(fieldsIdsAtom);
  const router = useRouter();
  const currentPath = usePathname();
  let rangesCondition = checkRangesCondition(ranges);

  const handleMenu = () => {
    setShowModal((current) => !current);
  };

  const isAuthPage = () => {
    return currentPath.startsWith("/painel-administrativo/autenticacao");
  };

  const isProjectPage = () => {
    return currentPath.startsWith("/painel-administrativo/projeto");
  };

  const isPersonsPage = () => {
    return currentPath.startsWith("/painel-administrativo/pessoas");
  };

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

  function checkRangesCondition(ranges: {
    [key: string]: SelectableRangeProps;
  }): boolean {
    const keys = Object.keys(ranges);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key !== undefined) {
        const range = ranges[key];
        if (range && (!range.startDate || !range.endDate)) {
          return false;
        }
      }
    }
    return true;
  }

  // Verificar se selectedValues não está vazio em rowsAndSelectedValues
  const selectedValuesNotEmpty1 = Object.values(
    rowsAndSelectedValues.selectedValues
  ).every((value) => value !== "");

  // Verificar se selectedValues não está vazio em projectSelectedValue
  const selectedValuesNotEmpty2 =
    Object.keys(projectSelectedValue.selectedValue).length > 0;

  const isConditionMet =
    rangesCondition && selectedValuesNotEmpty1 && selectedValuesNotEmpty2;

  const renderIconsAndSidebar = () => {
    if (!isAuthPage()) {
      return (
        <>
          <SidebarContainer isShow={showModal}>
            <CloseContainer>
              <button onClick={() => setShowModal(false)}>
                <span className={poppins.className}>Fechar</span>
                <IoCloseSharp size={24} /> {/* Adicione o ícone de fechar */}
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
              {isProjectPage() ? (
                <PostTaskCheckButton
                  // onClick={taskPostRequest}
                  disabled={!isConditionMet}
                >
                  <RiCheckFill size={24} />
                </PostTaskCheckButton>
              ) : isPersonsPage() ? (
                <UpdateTaskCheckButton
                /* onClick ={updateTaskReq}*/
                ></UpdateTaskCheckButton>
              ) : (
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
