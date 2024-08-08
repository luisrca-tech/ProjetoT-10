import { useAtom } from "jotai";
import { useEffect, useState, useRef, useCallback } from "react";

import { usePathname } from "next/navigation";
import { type EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import { hoursPerMonthAtom } from "~/@atom/api/CustomFields/hoursPerMonth";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";
import { hourValueAtom } from "~/@atom/api/CustomFields/hourValue";
import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { chargeOptionsAtom } from "~/@atom/api/CustomFields/chargeOptionsAtom";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import { clickUpFetch } from "~/server/clickUpFetch";
import { showToast } from "~/utils/functions/showToast";

export type ClickUpFetchProps = {
  body?: unknown;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "UPDATE";
  endPoint: EndPointClickUpApiEnum | string;
  token?: string;
  params?: Record<string, any>;
};

export default function useClickUpFetch<T>(endPoint?: string) {
  const [projectCustomField, setProjectCustomField] = useState([]);
  const [getCustomFieldsResponse] = useState([]);
  const [hoursPerMonth, setHoursPerMonth] = useAtom(hoursPerMonthAtom);
  const [projectOptions, setProjectOptions] = useAtom(projectOptionsAtom);
  const [hourValue, setHourValue] = useAtom(hourValueAtom);
  const [fieldsIds, setFieldsIds] = useAtom(fieldsIdsAtom);
  const [chargeOptions, setChargeOptions] = useAtom(chargeOptionsAtom);
  const [data, setData] = useState<T>();
  const [, setLoading] = useAtom(loadingAtom);
  const currentPath = usePathname();
  const requestInitiated = useRef(false);
  const [isFetchAllCustomFields, setIsFetchAllCustomFields] =
    useState<boolean>(false);
  const handleFetchResponse = useCallback(
    function handleFetchResponse(response: any[]) {
      if (!response || response.length === 0) return;

      const customFields = {
        project: response.find(
          (field: { name: string }) => field.name === "PixelCraft_projeto"
        ),
        charge: response.find(
          (field: { name: string }) => field.name === "PixelCraft_cargos"
        ),
        hoursPerMonth: response.find(
          (field: { name: string }) => field.name === "PixelCraft_Horas_Mes"
        ),
        value: response.find(
          (field: { name: string }) => field.name === "PixelCraft_Valor"
        ),
      };

      if (endPoint === `field`) {
        const projectOptions = customFields.project?.type_config.options;
        const chargeOptions = customFields.charge?.type_config.options;
        const fieldsIds = {
          chargeFieldId: customFields.charge?.id,
          projectFieldId: customFields.project?.id,
          valueFieldId: customFields.value?.id,
          hoursPerMonthCustomFieldId: customFields.hoursPerMonth?.id,
        };

        setProjectCustomField(customFields.project);
        setChargeOptions(chargeOptions);
        setHoursPerMonth(customFields.hoursPerMonth);
        setHourValue(customFields.value);
        setFieldsIds(fieldsIds);
        setProjectOptions(projectOptions);

        const isFetchAllCustomFields =
          Object.values(customFields).every(Boolean);

        setIsFetchAllCustomFields(isFetchAllCustomFields);

        if (currentPath === "/painel-administrativo/projetos") {
          if (!customFields.project) {
            showToast(
              "error",
              "Não existe Projeto_PixelCraft na lista",
              "Confira o nome desse campo personalizado em sua lista ClickUp!"
            );
          }
          showToast(
            "success",
            "Projetos carregados",
            "Bem vindo aos seus projetos"
          );
        }

        if (currentPath === "/painel-administrativo/projeto") {
          if (!isFetchAllCustomFields) {
            const missingFields = Object.entries(customFields)
              .filter(([_, value]) => !value)
              .map(([key]) => `PixelCraft_${key}`)
              .join(", ");

            showToast(
              "error",
              "Erro ao carregar projeto",
              `${missingFields} não existem na lista`
            );
          } else {
            const missingOptions = [
              !projectOptions ? "projetos" : null,
              !chargeOptions ? "cargos" : null,
            ]
              .filter(Boolean)
              .join(", ");

            if (missingOptions) {
              showToast(
                "warning",
                "Projeto carregado",
                `Não existem opções em ${missingOptions}`
              );
            } else {
              showToast(
                "success",
                "Projeto carregado",
                "Bem vindo ao seu projeto"
              );
            }
          }
        }
      }
    },
    [
      currentPath,
      endPoint,
      setChargeOptions,
      setFieldsIds,
      setHourValue,
      setHoursPerMonth,
      setProjectOptions,
    ]
  );

  const fetch = useCallback(async () => {
    if (requestInitiated.current) return;
    requestInitiated.current = true;
    setLoading(true);

    const fetchParams: ClickUpFetchProps = {
      endPoint: endPoint as EndPointClickUpApiEnum,
    };

    const response = await clickUpFetch(fetchParams);
    setData(response);
    handleFetchResponse(response);
    setLoading(false);
  }, [endPoint, handleFetchResponse, setLoading]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    getCustomFieldsResponse,
    projectCustomField,
    projectOptions,
    hoursPerMonth,
    hourValue,
    chargeOptions,
    fieldsIds,
    isFetchAllCustomFields,
  };
}
