import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { chargeOptionsAtom } from "~/@atom/api/CustomFields/chargeOptionsAtom";
import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import { api } from "~/trpc/react";
import { type CustomField, type Task } from "../types/clickUpApi";

type FetchResponseType = {
  customFieldData?: CustomField[];
  tasksData?: Task[];
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

  const getTasks = api.clickup.getTasks.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.task,
  });

  const getCustomField = api.clickup.getCustomFields.useQuery({
    endPoint: EndPointClickUpApiEnum.enum.field,
  });
  const customFieldData = getCustomField.data;
  const tasksData = getTasks.data;

  const handleFetchResponse = useCallback(
    function handleFetchResponse({
      customFieldData,
      tasksData,
    }: FetchResponseType) {
      setLoading(true);
      const isNoDatas =
        !customFieldData ||
        customFieldData.length === 0 ||
        !tasksData ||
        tasksData.length === 0;

      if (isNoDatas) {
        return {
          isFetchAllCustomFields: false,
          tasksOfProject: [],
        };
      }

      const customFields = {
        project: customFieldData?.find(
          (field: CustomField) => field.name === "PixelCraft_projeto"
        ),
        charge: customFieldData?.find(
          (field: CustomField) => field.name === "PixelCraft_cargos"
        ),
        hoursPerMonth: customFieldData?.find(
          (field: CustomField) => field.name === "PixelCraft_Horas_Mes"
        ),
        workValue: customFieldData?.find(
          (field: CustomField) => field.name === "PixelCraft_Valor"
        ),
      };

      const projectOptions = customFields.project?.type_config.options;
      const chargeOptions = customFields.charge?.type_config.options;
      const fieldsIds = {
        chargeFieldId: customFields.charge?.id,
        projectFieldId: customFields.project?.id,
        valueFieldId: customFields.workValue?.id,
        hoursPerMonthCustomFieldId: customFields.hoursPerMonth?.id,
      };

      setChargeOptions(chargeOptions);
      setFieldsIds(fieldsIds);
      setProjectOptions(projectOptions);

      const isFetchAllCustomFields = Object.values(customFields).every(Boolean);
      setIsFetchAllCustomFields(isFetchAllCustomFields);

      if (!isFetchAllCustomFields) {
        const missingFields = Object.entries(customFields)
          .filter(([_, value]) => !value)
          .map(([key]) => `PixelCraft_${key}`)
          .join(", ");

        setMissingFields(missingFields);
        setLoading(false);

        return {
          isFetchAllCustomFields: [],
          tasksOfProject: [],
          missingFields: missingFields,
        };
      }

      const tasksOfProject = tasksData?.filter((task) =>
        task.custom_fields.some((field) => {
          if (Array.isArray(field.value) && projectId) {
            return field.value.includes(projectId);
          }
          return false;
        })
      );

      setTasksOfProject(tasksOfProject);
      setLoading(false);
    },
    [projectId, setChargeOptions, setFieldsIds, setLoading, setProjectOptions]
  );

  const fetch = useCallback(async () => {
    handleFetchResponse({ customFieldData, tasksData });
  }, [customFieldData, handleFetchResponse, tasksData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    isFetchAllCustomFields,
    tasksOfProject,
    missingFields,
  };
}
