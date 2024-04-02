export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "0",
    width: "6.875rem",
    height: "2.5rem",
    borderRadius: "60px",
    boxShadow: "none",
    backgroundColor: "#EEEEEE",
    display: "flex",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#EEEEEE", // Defina a cor de fundo desejada para a lista de opções
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#1D1B20",
    fontSize: "1rem",
    fontFamily: "Roboto",
  }),
  dropdownIndicator: (provided: any) => ({}),
  option: (provided: any) => ({
    ...provided,
    backgroundColor: "#EEEEEE",
    color: "#1D1B20",
    "&:hover": {
      backgroundColor: "#e9ecef",
    },
  }),
};
