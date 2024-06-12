export type ChargeOptionType = {
  id?: string;
  name: string;
  color?: string | null;
  orderindex?: number;
  value: string;
};

export type ChargeFieldType = {
  id?: string;
  name?: string;
  type?: string;
  type_config: {
    new_drop_down: boolean;
    options: ChargeOptionType;
  };
  date_created?: string;
  hide_from_guests?: boolean;
  required?: boolean;
};

export type ProjectOptionType = {
  id: string;
  label: string;
  color: null;
};

export type ProjectFieldType = {
  id?: string;
  name?: string;
  type?: string;
  type_config?: {
    new_drop_down: boolean;
    options: ProjectOptionType;
  };
  date_created?: string;
  hide_from_guests?: boolean;
  required?: boolean;
  value: [string];
};
