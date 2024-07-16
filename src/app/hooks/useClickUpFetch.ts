import { loadingAtom } from "@/@atom/LoadingState/loadingAtom";
import { useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";

import { toast } from "react-toastify";
import { chargeOptionsAtom } from "@/@atom/api/CustomFields/chargeOptionsAtom";
import { fieldsIdsAtom } from "@/@atom/api/CustomFields/fieldsIds";

import { EndPointClickUpApiEnum } from "@/clickUpApi/EndPointClickUpApiEnum";
import { clickUpFetch } from "../services/api/clickUpFetch";

import { usePathname } from "next/navigation";
import { projectOptionsAtom } from "@/@atom/api/CustomFields/projectOptionsAtom";
import { hourValueAtom } from "@/@atom/api/CustomFields/hourValue";
import { hoursPerMonthAtom } from "@/@atom/api/CustomFields/hoursPerMonth";

type FieldsIdType = {
  chargeFieldId: string;
  projectFieldId: string;
  valueFieldId: string;
  hoursPerMonthCustomFieldId: string;
};

export type ClickUpFetchProps = {
  body?: unknown;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "UPDATE";
  endPoint: EndPointClickUpApiEnum | string;
  token?: string;
  params?: Record<string, any>;
};

export default function useClickUpFetch<T>(
  endPoint?: string,
  query?: Record<string, any>,
  shouldUseToken?: boolean,
) {
  const [projectCustomField, setProjectCustomField] = useState([]);

  const [getCustomFieldsResponse, setGetCustomFieldsResponse] = useState([]);
  const [hoursPerMonth, setHoursPerMonth] = useAtom(hoursPerMonthAtom);
  const [projectOptions, setProjectOptions] = useAtom(projectOptionsAtom);
  const [hourValue, setHourValue] = useAtom(hourValueAtom);
  const [fieldsIds, setFieldsIds] = useAtom(fieldsIdsAtom);
  const [chargeOptions, setChargeOptions] = useAtom(chargeOptionsAtom);

  const [data, setData] = useState<T>();
  const [, setLoading] = useAtom(loadingAtom);
  const currentPath = usePathname();

  const listId = "901303987731";

  const requestInitiated = useRef(false);

  const [isFetchAllCustomFields, setIsFetchAllCustomFields] =
    useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      if (requestInitiated.current) return; // Verifica se a requisição já foi iniciada
      requestInitiated.current = true; // Define a flag como verdadeira

      setLoading(true);

      let fetchParams: ClickUpFetchProps = {
        endPoint: endPoint as EndPointClickUpApiEnum,
        // params: queryBuilder,
      };

      const response = await clickUpFetch(fetchParams);
      setData(response);

      if (!response || response.length === 0) {
        setLoading(false);
        return;
      }

      if (endPoint === `field`) {
        const projectCustomField = response.find(
          (field: { name: string }) => field.name === "PixelCraft_projeto",
        );

        if (!projectCustomField) {
          toast.error(
            "Não existe campo personalizado Projeto_PixelCraft nesta lista",
          );
          setLoading(false);
          return;
        }

        const chargeCustomField = response.find(
          (field: { name: string }) => field.name === "PixelCraft_cargos",
        );
        console.log(chargeCustomField, `chargeCustomField`);

        const hoursPerMonthCustomField = response.find(
          (field: { name: string }) => field.name === "PixelCraft_Horas_Mes",
        );

        const valueCustomField = response.find(
          (field: { name: string }) => field.name === "PixelCraft_Valor",
        );

        const projectOptionsResp =
          projectCustomField && projectCustomField.type_config.options;

        const chargeOptions =
          chargeCustomField && chargeCustomField.type_config.options;

        const valueFieldId = valueCustomField && valueCustomField.id;
        const hoursPerMonthCustomFieldId =
          hoursPerMonthCustomField && hoursPerMonthCustomField.id;

        const chargeFieldId = chargeCustomField && chargeCustomField?.id;
        const projectFieldId = projectCustomField && projectCustomField.id;

        //testar

        const fieldsIds = {
          chargeFieldId,
          projectFieldId,
          valueFieldId,
          hoursPerMonthCustomFieldId,
        };
        setProjectCustomField(projectCustomField);
        setChargeOptions(chargeOptions);
        setHoursPerMonth(hoursPerMonthCustomField);
        setHourValue(valueCustomField);
        setFieldsIds(fieldsIds);
        setProjectOptions(projectOptionsResp);

        const isFetchAllCustomFields =
          chargeCustomField &&
          hoursPerMonthCustomField &&
          valueCustomField &&
          projectOptionsResp &&
          chargeOptions;

        setIsFetchAllCustomFields(isFetchAllCustomFields);

        if (currentPath === "/painel-administrativo/projetos") {
          if (!projectOptionsResp) {
            toast.error(
              "Nao existem tasks com projetos selecionados nesta lista!",
            );
          }
          toast.success("Projetos carregados");
        }

        if (currentPath === "/painel-administrativo/projeto") {
          let messageError;

          if (!chargeCustomField) {
            messageError =
              "nao existe campo personalizado PixelCraft_cargos nesta lista!";
            toast.error(messageError);
          }
          if (!hoursPerMonthCustomField) {
            messageError =
              "nao existe campo personalizado PixelCraft_Horas_Mes nesta lista!";
            toast.error(messageError);
          }
          if (!valueCustomField) {
            messageError =
              "nao existe campo personalizado PixelCraft_Valor lista!";
            toast.error(messageError);
          }

          if (!projectOptionsResp) {
            messageError = "nao existem opcoes de projeto para selecao!";
            toast.error(messageError);
          }
          if (!chargeOptions) {
            messageError = "nao existem opcoes de cargo para selecao!";
            toast.error(messageError);
          }

          if (isFetchAllCustomFields) {
            toast.success("Projeto carregado com sucesso!");
          }
        }
      }

      setLoading(false);
    }

    fetch();
  }, [
    currentPath,
    data,
    endPoint,
    setChargeOptions,
    setFieldsIds,
    setHourValue,
    setHoursPerMonth,
    setLoading,
    setProjectOptions,
  ]);

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
