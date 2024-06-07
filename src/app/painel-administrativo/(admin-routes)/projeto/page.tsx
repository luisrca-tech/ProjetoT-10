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
import { ChargeOption } from "@/app/types/componentsTypes/type";

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
  const [chargeOptions, setChargeOptions] = useState<ChargeOption[]>([]);
  const [charge, setCharge] = useState({});
  const [getCustomFieldsResponse, setGetCustomFieldsResponse] = useState([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [newCustomFields, setNewCustomFields] = useState<Array<{}>>([]);

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
    setGetCustomFieldsResponse(response);
    const chargeCustomField = response.find(
      (field: { name: string }) => field.name === "Cargo",
    );
    console.log(chargeCustomField, `chargeCustomField`);
    setCharge(chargeCustomField);
    setChargeOptions(chargeCustomField.type_config.options);
  }

  useEffect(() => {
    setNewCustomFields((prev) => [...prev, charge]);
  }, [charge]);
  // aqui vai vir os 3 estados que vao armazenar os customFields que queremos ja enviar no POST, por enquanto
  // so tem charge

  async function taskPostRequest() {
    setCharge((prev) => ({ ...prev, value: 0 })); // value mockado, esse value vai vir do click da option do dropdown
    await postTasks({ listId, newCustomFields });
  }

  async function updateTaskRequest() {
    await updateTask();
  }

  useEffect(() => {
    customFieldsGetRequest();
  }, []); // aqui sera colocado listId como dependencia, pois ele chegara nessa pagina por param.

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
            dropdownOptions={chargeOptions}
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
