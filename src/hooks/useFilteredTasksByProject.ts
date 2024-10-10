import { useSession } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import {
  type CustomField,
  type OptionType,
  type Task,
} from "~/server/types/Clickup.type";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";

type FetchResponseType = {
  customFieldData?: CustomField[];
  tasksData?: Task[];
};

type FilteredTasksByProject = {
  project: OptionType;
  tasks: Task[] | undefined;
  dates:
    | {
        minStartDate: number | null;
        maxEndDate: number | null;
      }
    | undefined;
};

export function useFilteredTasksByProject() {
  const { session } = useSession()
  const userId = session?.user.id;

  const [filteredTasksByProject, setFilteredTasksByProject] =
    useState<FilteredTasksByProject[]>();
  const [, setLoading] = useAtom(loadingAtom);
  const [isNocustomFieldProject, setIsNocustomFieldProject] =
    useState<boolean>(false);

  const getTasks = api.clickup.getTasks.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.task,
    userId: userId ?? '',
  });

  const getCustomField = api.clickup.getCustomFields.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.field,
    userId: userId ?? '',
  });

  const handleFetchResponse = useCallback(
    ({ customFieldData, tasksData }: FetchResponseType) => {
      if (customFieldData != undefined && tasksData != undefined) {
        const projectCustomField = customFieldData?.find(
          (field: CustomField) => field.name === "PixelCraft_projeto"
        );

        if (!projectCustomField) {
          setIsNocustomFieldProject(true);
          return { filteredTasksByProject: [] };
        }

        const projectOptionsResp =
          projectCustomField?.type_config.options || [];

        const projectsWithTasks = projectOptionsResp?.filter(
          (project: OptionType) =>
            tasksData?.some((task) =>
              task.custom_fields.some(
                (field) =>
                  Array.isArray(field.value) && field.value.includes(project.id)
              )
            )
        );

        const filteredTasksByProject = projectsWithTasks?.map((project) => {
          const tasksOfProject = tasksData?.filter((task) =>
            task.custom_fields.some((field) => {
              if (Array.isArray(field.value)) {
                return field.value.includes(project.id);
              }
              return false;
            })
          );

          const dates = tasksOfProject?.reduce(
            (acc, task) => {
              const startDate = task.start_date
                ? parseInt(task.start_date)
                : null;
              const endDate = task.due_date ? parseInt(task.due_date) : null;

              if (
                startDate &&
                (!acc.minStartDate || startDate < acc.minStartDate)
              ) {
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

          return { project, tasks: tasksOfProject, dates };
        });

        setFilteredTasksByProject(filteredTasksByProject);
        setLoading(false);
      }
    },
    [setLoading]
  );

  useEffect(() => {
    setLoading(true);
    const customFieldData = getCustomField.data ?? [];
    const tasksData = getTasks.data ?? [];
    if (getCustomField.isFetched) {
      if (Array.isArray(customFieldData)) {
        handleFetchResponse({ customFieldData, tasksData });
      } else {
        showToast(
          "error",
          "Erro de autorização ao acessar CustomFields!",
          "Confira seus listId e AuthorizationToken"
        );
      }
      setLoading(false);
    }
  }, [
    getCustomField.data,
    getCustomField.isFetched,
    getTasks.data,
    handleFetchResponse,
    setLoading,
  ]);

  return {
    filteredTasksByProject,
    isNocustomFieldProject,
  };
}
