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
import { poppins } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { IoCloseSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { RiCheckFill } from "react-icons/ri";
import { postTasks } from "@/app/services/api/tasks/postTask";

import { getCustomFields } from "@/app/services/api/customFields/getCustomFields";
import { useAtom } from "jotai";
import { chargeOptionsAtom } from "@/@atom/api/CustomFields/chargeOptionsAtom";
import { projectOptionsAtom } from "@/@atom/api/CustomFields/projectFieldAtom";

import { loading } from "@/@atom/LoadingState/loadingAtom";
import { rowsAndSelectedValuesAtom } from "@/@atom/ProjectStates/rowsAndSelectedValuesAtom";

export default function Header() {
  const [, setProjectOptions] = useAtom(projectOptionsAtom);
  const [, setChargeOptions] = useAtom(chargeOptionsAtom);
  const [, setLoading] = useAtom(loading);
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [, setGetCustomFieldsResponse] = useState([]);

  const [fieldId, setFieldId] = useState<string>("");
  const [customFiledLoading, setCustomFieldLoading] = useState<boolean>();

  const listId = "901303987731";

  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    async function customFieldsGetRequest() {
      setLoading(true);

      const getCustomFieldResp = await getCustomFields(listId);
      setGetCustomFieldsResponse(getCustomFieldResp);
      const chargeCustomField = getCustomFieldResp.find(
        (field: { name: string }) => field.name === "PixelCraft_cargos",
      );

      const projectCustomField = getCustomFieldResp.find(
        (field: { name: string }) => field.name === "PixelCraft_projeto",
      );

      const projectOptions = projectCustomField.type_config.options;
      setProjectOptions(projectOptions);

      const chargeFieldId = chargeCustomField.id;
      setFieldId(chargeFieldId);

      const chargeOptions = chargeCustomField.type_config.options;
      setChargeOptions(chargeOptions);

      setLoading(false);
    }

    customFieldsGetRequest();
  }, [setChargeOptions, setLoading, setProjectOptions]);

  async function taskPostRequest() {
    await postTasks({
      listId,
      fieldId,
      rowsAndSelectedValues,
    });
  }

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
                  onClick={taskPostRequest}
                  disabled={customFiledLoading}
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
