import { atom } from "jotai";
type FieldsIdType = {
  chargeFieldId: string;
  projectFieldId: string;
  valueFieldId: string;
  hoursPerMonthCustomFieldId: string;
};

export const fieldsIdsAtom = atom<FieldsIdType>({
  chargeFieldId: "",
  projectFieldId: "",
  valueFieldId: "",
  hoursPerMonthCustomFieldId: "",
});
