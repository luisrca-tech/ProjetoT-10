"use client";

import FormSelectInput from "@/app/components/forms/FormSelectInput";
import {
  CloseCalendarContainer,
  Container,
  FormContainer,
  MainContainer,
  SwitchContainer,
} from "./styles";
import { ProjectProfileHeader } from "../../../components/surfaces/ProjectProfileHeader";
import { roboto } from "@/app/fonts";
import { useEffect, useState } from "react";
import ToggleSwitch from "@/app/components/widgets/ToggleSwitch";
import { CustomDateRangePicker } from "@/app/components/widgets/CustomDateRangePicker";
import Header from "@/app/components/surfaces/header";
import { useAtom } from "jotai";
import { checkedAtom } from "@/@atom/ProjectStates/checkedAtom";
import { isDatePickerOpenAtom } from "@/@atom/ProjectStates/isDatePickerOpenAtom";
import { stringRowAtom } from "@/@atom/ProjectStates/stringRowAtom";
import { getCustomFields } from "@/api/get-custom-fields";
import { postTasks } from "@/api/post-task";
import { updateTask } from "@/api/update-taks";

export default function Projeto() {
  const [ checked, setChecked ] = useAtom(checkedAtom)
  const [isDatePickerOpen, setIsDatePickerOpen] = useAtom(isDatePickerOpenAtom)
  const [ , setStringRow ] = useAtom(stringRowAtom)

  const [customFieldsResponse, setCustomFieldsResponse] = useState([]);
  const listId = "901302288467";
  //Este listId sera disponibilizado em algum momento na app e importado para ca.

  function openDatePicker() {
    setIsDatePickerOpen(true);
  };

  function inputDataMenuClick(row: string) {
    openDatePicker();
    setStringRow(row);
  }

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  const handleBlurCalendar = () => {
    setIsDatePickerOpen(false);
  };

  async function customFieldsGetRequest() {
    const response = await getCustomFields(listId);
    setCustomFieldsResponse(response);
  }

  async function taskPostRequest() {
    await postTasks({ listId, customFieldsResponse });
  }

  async function updateTaskRequest() {
    await updateTask();
  }

  useEffect(() => {
    customFieldsGetRequest();
  }, []); // aqui sera colocado listId como dependencia, pois ele chegara nessa pagina por param.

  useEffect(() => {
    console.log(customFieldsResponse, `customFieldsResponse`);
  }, [customFieldsResponse]); // aqui sera colocado listId como dependencia, pois ele chegara nessa pagina por param.

  return (
    <Container className={roboto.className}>
      <Header onTaskPost={taskPostRequest} onTaskUpdate={updateTaskRequest} />

      <ProjectProfileHeader inputDataMenuClick={inputDataMenuClick} />

      <MainContainer>
        {isDatePickerOpen && (
          <CustomDateRangePicker />
        )}
        <FormContainer isDatePickerOpen={isDatePickerOpen}>
          <SwitchContainer>
            <span>Editar datas</span>
            <ToggleSwitch onChange={handleCheckedChange} />
          </SwitchContainer>
          <FormSelectInput inputDataMenuClick={inputDataMenuClick}/>
        </FormContainer>
      </MainContainer>

      <CloseCalendarContainer
        isDatePickerOpen={isDatePickerOpen}
        onClick={handleBlurCalendar}
      ></CloseCalendarContainer>
    </Container>
  );
}
function foodFetch() {
  throw new Error("Function not implemented.");
}
