import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { chargeOptionsAtom } from "~/@atom/api/CustomFields/chargeOptionsAtom";
import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import {
  type CustomField,
  type OptionType,
  type Task,
} from "~/server/types/Clickup.type";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";

type FetchResponseType = {
  customFieldData: CustomField[];
  tasksData: Task[];
};

export function useTasksOfProject() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [isFetchAllCustomFields, setIsFetchAllCustomFields] =
    useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string>("");
  const [tasksOfProject, setTasksOfProject] = useState<Task[] | undefined>();
  const [, setProjectOptions] = useAtom(projectOptionsAtom);
  const [, setFieldsIds] = useAtom(fieldsIdsAtom);
  const [, setChargeOptions] = useAtom(chargeOptionsAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setProjectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const currentRow = "projectRow";
  const router = useRouter();

  const getTasks = api.clickup.getTasks.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.task,
  });

  const getCustomField = api.clickup.getCustomFields.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.field,
  });

  const handleFetchResponse = useCallback(
    ({ customFieldData, tasksData }: FetchResponseType) => {
      if (!!customFieldData && !!tasksData) {
        const customFields = {
          project: customFieldData.find(
            (field: CustomField) => field.name === "PixelCraft_projeto"
          ),
          charge: customFieldData.find(
            (field: CustomField) => field.name === "PixelCraft_cargos"
          ),
          hoursPerMonth: customFieldData.find(
            (field: CustomField) => field.name === "PixelCraft_Horas_Mes"
          ),
          workValue: customFieldData.find(
            (field: CustomField) => field.name === "PixelCraft_Valor"
          ),
        };

        const projectOptions = customFields.project?.type_config.options;
        const projectsWithoutTasks = projectOptions?.filter(
          (project: OptionType) =>
            !tasksData?.some((task) =>
              task.custom_fields.some(
                (field) =>
                  Array.isArray(field.value) && field.value.includes(project.id)
              )
            )
        );

        const foundActualProject = projectOptions?.find(
          (project) => project.id === projectId
        );

        setProjectSelectedValue((prevState) => ({
          ...prevState,
          selectedValue: {
            ...prevState.selectedValue,
            [`${currentRow}-text`]: foundActualProject?.label || "",
            [`${currentRow}-option`]: foundActualProject?.id || "",
          },
        }));

        const chargeOptions = customFields.charge?.type_config.options;
        const fieldsIds = {
          chargeFieldId: customFields.charge?.id,
          projectFieldId: customFields.project?.id,
          valueFieldId: customFields.workValue?.id,
          hoursPerMonthCustomFieldId: customFields.hoursPerMonth?.id,
        };

        setChargeOptions(chargeOptions);
        setFieldsIds(fieldsIds);
        setProjectOptions(projectsWithoutTasks);

        const isFetchAllCustomFields =
          Object.values(customFields).every(Boolean);
        setIsFetchAllCustomFields(isFetchAllCustomFields);

        if (!isFetchAllCustomFields) {
          const missingFields = Object.entries(customFields)
            .filter(([_, value]) => !value)
            .map(([key]) => `PixelCraft_${key}`)
            .join(", ");

          setMissingFields(missingFields);

          return {
            isFetchAllCustomFields: false,
            tasksOfProject: [],
            missingFields: missingFields,
          };
        }

        const tasksOfProject = tasksData.filter((task) =>
          task.custom_fields.some((field) => {
            if (Array.isArray(field.value) && projectId) {
              return field.value.includes(projectId);
            }
            return false;
          })
        );
        setTasksOfProject(tasksOfProject);
        setLoading(false);
      }
    },
    [
      projectId,
      setChargeOptions,
      setFieldsIds,
      setLoading,
      setProjectOptions,
      setProjectSelectedValue,
    ]
  );

  useEffect(() => {
    const customFieldData = getCustomField.data ?? [];
    const tasksData = getTasks.data ?? [];

    if (getCustomField.isFetched && getTasks.isFetched) {
      if (Array.isArray(customFieldData)) {
        handleFetchResponse({ customFieldData, tasksData });
      } else {
        showToast(
          "error",
          "Erro de autorização ao acessar CustomFields!",
          "Confira seus listId e AuthorizationToken"
        );

        router.push("/painel-administrativo/projetos");
      }
    }
  }, [
    getCustomField.data,
    getCustomField.isFetched,
    getTasks.data,
    getTasks.isFetched,
    handleFetchResponse,
    router,
    setLoading,
  ]);

  function getTasksInfos() {
    return tasksOfProject?.map((task) => {
      const taskId = task.id;
      const chargeField = task.custom_fields.find(
        (field) => field.name === "PixelCraft_cargos"
      );
      const hoursField = task.custom_fields.find(
        (field) => field.name === "PixelCraft_Horas_Mes"
      );
      const valueField = task.custom_fields.find(
        (field) => field.name === "PixelCraft_Valor"
      );

      const taskStartDate = task.start_date
        ? new Date(parseInt(task.start_date))
        : new Date();
      const taskDueDate = task.due_date
        ? new Date(parseInt(task.due_date))
        : new Date();

      const chargeOptions = chargeField?.type_config?.options;
      const chargeValue = chargeField?.value;
      let chargeName = "";

      if (chargeOptions && typeof chargeValue === "number") {
        chargeName = chargeOptions[chargeValue]?.name ?? "";
      }

      const hasNumber = /\d/;
      const fieldName = hasNumber.test(task.name) ? "" : task.name;

      return {
        taskId,
        chargeName,
        fieldName,
        hours: hoursField?.value || 0,
        valueByHour: valueField?.value || 0,

        taskStartDate,
        taskDueDate,
        chargeOptions,
        chargeValue,
      };
    });
  }

  return {
    isFetchAllCustomFields,
    tasksOfProject,
    missingFields,
    fieldsIdsAtom,
    getTasksInfos,
  };
}
