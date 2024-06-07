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
import ToggleSwitch from "@/app/components/widgets/ToggleSwitch";
import { CustomDateRangePicker } from "@/app/components/widgets/CustomDateRangePicker";
import Header from "@/app/components/surfaces/header";
import { useAtom } from "jotai";
import { checkedAtom } from "@/@atom/ProjectStates/checkedAtom";
import { isDatePickerOpenAtom } from "@/@atom/ProjectStates/isDatePickerOpenAtom";
import { stringRowAtom } from "@/@atom/ProjectStates/stringRowAtom";

export default function Projeto() {
  const [ checked, setChecked ] = useAtom(checkedAtom)
  const [isDatePickerOpen, setIsDatePickerOpen] = useAtom(isDatePickerOpenAtom)
  const [ , setStringRow ] = useAtom(stringRowAtom)

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

  return (
    <Container className={roboto.className}>
      <Header />

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
