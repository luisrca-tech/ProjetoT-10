"use client";

import {
  Container,
  MainContainer,
  FormContainer,
  SwitchContainer,
  CloseCalendarContainer,
} from "./styles";

import { useCallback, useEffect } from "react";

import { useAtom } from "jotai";
import useClickUpFetch from "~/app/hooks/useClickUpFetch";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import { type Task } from "~/app/types/clickUpApi";

import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { stringRowAtom } from "~/@atom/ProjectStates/stringRowAtom";
import { rowCountAtom } from "~/@atom/ProjectStates/rowCountAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import { ProjectProfileHeader } from "../ProjectProfileHeader";
import ToggleSwitch from "../../widgets/ToggleSwitch";
import FormSelectInput from "../../forms/FormSelectInput";
import { useSearchParams } from "next/navigation";

export function ProjectDetailsContent() {
  const [checked, setChecked] = useAtom(checkedAtom);
  const [isDatePickerOpen, setIsDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const [, setStringRow] = useAtom(stringRowAtom);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [rowsAndSelectedValues, setRowsAndSelectedValues] = useAtom(
    rowsAndSelectedValuesAtom
  );
  const [, setRanges] = useAtom(rangesAtom);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

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

  const { projectOptions, isFetchAllCustomFields } = useClickUpFetch(
    EndPointClickUpApiEnum.FIELD
  );

  const { data: getTaskResp } = useClickUpFetch<Task[]>(
    EndPointClickUpApiEnum.TASK
  );

  const updateRowsAndSelectedValues = useCallback(
    (tasksForProject: Task[]) => {
      let count = 0;
      tasksForProject.forEach((task, index) => {
        count = index;

        const cargoField = task.custom_fields.find(
          (field) => field.name === "PixelCraft_cargos"
        );
        const horasField = task.custom_fields.find(
          (field) => field.name === "PixelCraft_Horas_Mes"
        );
        const valorField = task.custom_fields.find(
          (field) => field.name === "PixelCraft_Valor"
        );
        const taskStartDate = task.start_date
          ? new Date(parseInt(task.start_date))
          : new Date();
        const taskDueDate = task.due_date
          ? new Date(parseInt(task.due_date))
          : new Date();

        let cargoName = "";
        if (cargoField && Array.isArray(cargoField.type_config?.options)) {
          const option = cargoField.type_config.options.find(
            (opt) => opt.id === cargoField.value
          );
          cargoName = option ? option.name : "";
        }

        const cargoValue = cargoField ? `${cargoField.value}` : "";
        const horasValue = horasField ? `${horasField.value}` : "";
        const valorValue = valorField ? `${valorField.value}` : "";

        setRowsAndSelectedValues((prevState) => ({
          ...prevState,
          rows: [...prevState.rows, `row-${count}`],
          selectedValues: {
            ...prevState.selectedValues,
            [`firstTextValuerow-${count}-text`]: cargoName,
            [`firstTextValuerow-${count}-option`]: cargoValue,
            [`secondTextValuerow-${count}-text`]: horasValue,
            [`thirdTextValuerow-${count}-text`]: valorValue,
          },
        }));

        setRanges((prevState) => ({
          ...prevState,
          [`row-${count}`]: {
            endDate: taskDueDate,
            isSelected: true,
            key: `selection-row-${count}`,
            startDate: taskStartDate,
          },
        }));
      });

      const nextRow = `row-${count + 1}`;
      setRowsAndSelectedValues((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, nextRow],
      }));
      setRanges((prevState) => ({
        ...prevState,
        [nextRow]: {
          endDate: undefined,
          isSelected: false,
          key: `selection-row-${nextRow}`,
          startDate: undefined,
        },
      }));
    },
    [setRanges, setRowsAndSelectedValues]
  );

  useEffect(() => {
    if (projectId && getTaskResp) {
      const tasksForProject = getTaskResp.filter((task) =>
        task.custom_fields.some((field) => {
          if (Array.isArray(field.value)) {
            return field.value.includes(projectId);
          }
          return false;
        })
      );
      console.log(tasksForProject, "tasksForProject");
      if (tasksForProject.length > 0) {
        updateRowsAndSelectedValues(tasksForProject);
      }
    }
  }, [projectId, getTaskResp, updateRowsAndSelectedValues]);
  return (
    <>
      {isFetchAllCustomFields && (
        <>
          <ProjectProfileHeader inputDataMenuClick={inputDataMenuClick} />

          <MainContainer>
            {isDatePickerOpen && <CustomDateRangePicker />}
            <FormContainer isDatePickerOpen={isDatePickerOpen}>
              <SwitchContainer>
                <span>Editar datas</span>
                <ToggleSwitch onChange={handleCheckedChange} />
              </SwitchContainer>
              <FormSelectInput inputDataMenuClick={inputDataMenuClick} />
            </FormContainer>
          </MainContainer>

          <CloseCalendarContainer
            isDatePickerOpen={isDatePickerOpen}
            onClick={handleBlurCalendar}
          ></CloseCalendarContainer>
        </>
      )}
    </>
  );
}
