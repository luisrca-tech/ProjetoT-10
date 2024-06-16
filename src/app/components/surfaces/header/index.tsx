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
import { toast } from "react-toastify";
import { getCustomFields } from "@/app/services/api/customFields/getCustomFields";
import { useAtom } from "jotai";
import { chargeOptionsAtom } from "@/@atom/api/CustomFields/chargeOptionsAtom";
import { projectOptionsAtom } from "@/@atom/api/CustomFields/projectFieldAtom";
import { projectSelectedValuePropAtom } from "@/@atom/ProjectStates/projectSelectedValue";
import { loading } from "@/@atom/LoadingState/loadingAtom";
import { rowsAndSelectedValuesAtom } from "@/@atom/ProjectStates/rowsAndSelectedValuesAtom";
type FieldsIdType = {
  chargeFieldId: string;
  projectFieldId: string;
  valueFieldId: string;
  hoursPerMonthCustomFieldId: string;
};

export default function Header() {
  const [, setProjectOptions] = useAtom(projectOptionsAtom);
  const [, setChargeOptions] = useAtom(chargeOptionsAtom);
  const [, setLoading] = useAtom(loading);
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [, setGetCustomFieldsResponse] = useState([]);
  const listId = "901303987731"; //mocado.
  const [fieldsIds, setFieldsIds] = useState<FieldsIdType>({
    chargeFieldId: "",
    projectFieldId: "",
    valueFieldId: "",
    hoursPerMonthCustomFieldId: "",
  });
  const [customFiledLoading, setCustomFieldLoading] = useState<boolean>();

  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    async function customFieldsGetRequest() {
      setLoading(true);

      const getCustomFieldResp = await getCustomFields(listId);

      if (!getCustomFieldResp) {
        toast.error("Nao foi possível acessar customFields deste listId !");
      }

      setGetCustomFieldsResponse(getCustomFieldResp);
      const chargeCustomField = getCustomFieldResp.find(
        (field: { name: string }) => field.name === "PixelCraft_cargos",
      );

      const projectCustomField = getCustomFieldResp.find(
        (field: { name: string }) => field.name === "PixelCraft_projeto",
      );

      const hoursPerMonthCustomField = getCustomFieldResp.find(
        (field: { name: string }) => field.name === "PixelCraft_Horas_Mes",
      );

      const ValueCustomField = getCustomFieldResp.find(
        (field: { name: string }) => field.name === "PixelCraft_Valor",
      );

      const valueFieldId = ValueCustomField.id;
      const hoursPerMonthCustomFieldId = hoursPerMonthCustomField.id;

      const chargeFieldId = chargeCustomField.id;
      const projectFieldId = projectCustomField.id;

      const fieldsIds = {
        chargeFieldId,
        projectFieldId,
        valueFieldId,
        hoursPerMonthCustomFieldId,
      };
      setFieldsIds(fieldsIds);

      const projectOptions = projectCustomField.type_config.options;
      setProjectOptions(projectOptions);

      const chargeOptions = chargeCustomField.type_config.options;
      setChargeOptions(chargeOptions);

      setLoading(false);
    }

    customFieldsGetRequest();
    toast.success("CustomFields da lista acessados !");
  }, [projectSelectedValue, setChargeOptions, setLoading, setProjectOptions]);

  async function taskPostRequest() {
    setLoading(true);
    try {
      await postTasks({
        fieldsIds,
        rowsAndSelectedValues,
        projectSelectedValue,
      });
      toast.success("Tasks criadas e vinculadas ao NOME DO PROJETO");
    } catch (error) {
      toast.error("Não foi possível concluir a criação das Tasks");
    } finally {
      setLoading(false);
    }

    setLoading(false);
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
