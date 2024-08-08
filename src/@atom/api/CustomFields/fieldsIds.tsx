import { atom } from "jotai";
export type FieldsIdType = {
  chargeFieldId: string | undefined;
  projectFieldId: string | undefined;
  valueFieldId: string | undefined;
  hoursPerMonthCustomFieldId: string | undefined;
};

export const fieldsIdsAtom = atom<FieldsIdType>({
  chargeFieldId: "",
  projectFieldId: "",
  valueFieldId: "",
  hoursPerMonthCustomFieldId: "",
});
