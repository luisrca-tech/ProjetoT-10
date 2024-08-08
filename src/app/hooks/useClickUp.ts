import { useAtom } from "jotai";
import { useEffect } from "react";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";

import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";

import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { chargeOptionsAtom } from "~/@atom/api/CustomFields/chargeOptionsAtom";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";

import {
  type CustomField,
  type ProjectOptionType,
} from "~/server/types/Clickup.type";

import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";

export type ClickUpFetchProps = {
  body?: unknown;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "UPDATE";
  endPoint: EndPointClickUpApiEnum | string;
  token?: string;
  params?: Record<string, any>;
};

export type OptimisticFields = {
  isFetchAllCustomFields: boolean;
};

export function useClickUp() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [, setProjectOptions] = useAtom(projectOptionsAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setFieldsIds] = useAtom(fieldsIdsAtom);
  const [, setChargeOptions] = useAtom(chargeOptionsAtom);

  const getTasks = api.clickup.getTasks.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.task,
  });

  const getCustomField = api.clickup.getCustomFields.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.field,
  });

  const customFieldData = getCustomField.data;

  const customFields = {
    project: getCustomField?.data?.find(
      (field: CustomField) => field.name === "PixelCraft_projeto"
    ),
    charge: getCustomField?.data?.find(
      (field: CustomField) => field.name === "PixelCraft_cargos"
    ),
    hoursPerMonth: getCustomField?.data?.find(
      (field: CustomField) => field.name === "PixelCraft_Horas_Mes"
    ),
    workValue: getCustomField?.data?.find(
      (field: CustomField) => field.name === "PixelCraft_Valor"
    ),
  };

  const projectOptionsResp = customFields.project?.type_config.options || [];

  const isFetchAllCustomFields = Object.values(customFields).every(Boolean);

  const taskData = getTasks.data;

  const tasksOfProject = taskData?.filter((task) =>
    task.custom_fields.some((field) => {
      if (Array.isArray(field.value) && projectId) {
        return field.value.includes(projectId);
      }
      return false;
    })
  );

  const projectsWithTasks = projectOptionsResp?.filter(
    (project: ProjectOptionType) =>
      taskData?.some((task) =>
        task.custom_fields.some(
          (field) =>
            Array.isArray(field.value) && field.value.includes(project.id)
        )
      )
  );

  const filteredTasksByProject = projectsWithTasks?.map((project) => {
    const tasksForProject = taskData?.filter((task) =>
      task.custom_fields.some((field) => {
        if (Array.isArray(field.value)) {
          return field.value.includes(project.id);
        }
        return false;
      })
    );

    const dates = tasksForProject?.reduce(
      (acc, task) => {
        const startDate = task.start_date ? parseInt(task.start_date) : null;
        const endDate = task.due_date ? parseInt(task.due_date) : null;

        if (startDate && (!acc.minStartDate || startDate < acc.minStartDate)) {
          acc.minStartDate = startDate;
        }
        if (endDate && (!acc.maxEndDate || endDate > acc.maxEndDate)) {
          acc.maxEndDate = endDate;
        }

        return acc;
      },
      {
        minStartDate: null as number | null,
        maxEndDate: null as number | null,
      }
    );

    return { project, tasks: tasksForProject, dates };
  });

  useEffect(() => {
    const isLoading = getTasks.isLoading || getCustomField.isLoading;
    setLoading(isLoading);

    if (!isLoading && isFetchAllCustomFields) {
      const projectOptionsResp =
        customFields.project?.type_config.options || [];
      const chargeOptionsResp = customFields.charge?.type_config.options || [];
      const fieldsIdsResp = {
        chargeFieldId: customFields.charge?.id,
        projectFieldId: customFields.project?.id,
        valueFieldId: customFields.workValue?.id,
        hoursPerMonthCustomFieldId: customFields.hoursPerMonth?.id,
      };
      setProjectOptions(projectOptionsResp);
      setFieldsIds(fieldsIdsResp);
      setChargeOptions(chargeOptionsResp);
    }
  }, [
    getTasks.isLoading,
    getCustomField.isLoading,
    customFields.project,
    customFields.charge,
    customFields.hoursPerMonth,
    customFields.workValue,
    setProjectOptions,
    setFieldsIds,
    setChargeOptions,
    setLoading,
    isFetchAllCustomFields,
  ]);
  return {
    taskData,
    customFieldData,
    filteredTasksByProject,
    isFetchAllCustomFields,
    tasksOfProject,
  };
}
