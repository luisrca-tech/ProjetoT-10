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
import { updateTask } from "@/app/services/api/tasks/updateTask";
import { getCustomFields } from "@/app/services/api/customFields/getCustomFields";
import { useAtom } from "jotai";
import { chargeOptionsAtom } from "@/@atom/api/CustomFields/chargeOptionsAtom";

export default function Header() {
  const [, setChargeOptions] = useAtom(chargeOptionsAtom)

  const [newCustomFields, setNewCustomFields] = useState<Array<{}>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customFieldsResponse, setCustomFieldsResponse] = useState([]);
  const [getCustomFieldsResponse, setGetCustomFieldsResponse] = useState([]);
  const [charge, setCharge] = useState({});

  const listId = "901302288467";
  //Este listId sera disponibilizado em algum momento na app e importado para ca.

  const router = useRouter();
  const currentPath = usePathname();

   async function customFieldsGetRequest() {
    const response = await getCustomFields(listId);
    setGetCustomFieldsResponse(response);
    const chargeCustomField = response.find(
      (field: { name: string }) => field.name === "Cargo",
    );
    console.log(chargeCustomField, `chargeCustomField`);
    setCharge(chargeCustomField);
    setChargeOptions(chargeCustomField.type_config.options);
  }

  async function taskPostRequest() {
    setCharge((prev) => ({ ...prev, value: 0 })); // value mockado, esse value vai vir do click da option do dropdown
    await postTasks({ listId, newCustomFields });
  }

  async function updateTaskRequest() {
    await updateTask();
  }

  useEffect(() => {
    setNewCustomFields((prev) => [...prev, charge]);
  }, [charge]);
  // aqui vai vir os 3 estados que vao armazenar os customFields que queremos ja enviar no POST, por enquanto so tem charge

  useEffect(() => {
    customFieldsGetRequest();
  }, []); // aqui sera colocado listId como dependencia, pois ele chegara nessa pagina por param.

  
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
                <PostTaskCheckButton onClick={taskPostRequest}>
                  <RiCheckFill size={24} />
                </PostTaskCheckButton>
              ) : isPersonsPage() ? (
                <UpdateTaskCheckButton onClick={updateTask}></UpdateTaskCheckButton>
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
