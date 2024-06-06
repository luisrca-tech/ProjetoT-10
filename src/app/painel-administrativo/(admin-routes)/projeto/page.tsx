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
import { SelectableRangeProps } from "@/app/types/componentsTypes/type";
import { getCustomFields } from "../../../services/api/customFields/getCustomFields";
import { postTasks } from "../../../services/api/tasks/postTask";
import { updateTask } from "../../../services/api/tasks/updateTask";
import Header from "@/app/components/surfaces/header";


export default function Projeto() {
  const [rowCount, setRowCount] = useState(1);
  const [stringRow, setStringRow] = useState<string>("row-0");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [ranges, setRanges] = useState<{ [key: string]: SelectableRangeProps }>(
    {
      "global-project-data": {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection-global-project-data",
        isSelected: false,
      },
      "row-0": {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection-row-0",
        isSelected: false,
      },
    },
  );
  const [customFieldsResponse, setCustomFieldsResponse] = useState([]);
  const [checked, setChecked] = useState<boolean>(false);
  const listId = "901302288467";
  //Este listId sera disponibilizado em algum momento na app e importado para ca.

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  function inputDataMenuClick(row: string) {
    openDatePicker();
    setStringRow(row);
  }

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

      <ProjectProfileHeader
        ranges={ranges}
        inputDataMenuClick={inputDataMenuClick}
        checked={checked}
      />

      <MainContainer>
        {isDatePickerOpen && (
          <CustomDateRangePicker
            ranges={ranges}
            setRanges={setRanges}
            stringRow={stringRow}
          />
        )}
        <FormContainer isDatePickerOpen={isDatePickerOpen}>
          <SwitchContainer>
            <span>Editar datas</span>
            <ToggleSwitch onChange={handleCheckedChange} />
          </SwitchContainer>
          <FormSelectInput
            checked={checked}
            rowCount={rowCount}
            setRanges={setRanges}
            setRowCount={setRowCount}
            ranges={ranges}
            inputDataMenuClick={inputDataMenuClick}
          />
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
