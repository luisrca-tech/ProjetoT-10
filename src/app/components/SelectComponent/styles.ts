import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";
import FormSelect from "react-bootstrap/esm/FormSelect";

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export const CustomFormSelect = styled(FormSelect)`
  position: absolute;
  right: -3%;
  top: 0;
  height: 100%;
  width: 100%;
  appearance: none;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  background-size: 5px;
  border-radius: 60px;
  border: none;
  outline: none;
  color: transparent;
  cursor: pointer;
`;

export const Option = styled.option`
  width: 130%;
  color: ${theme.COLORS.SECONDARY_DARK};
  border-radius: 20px;  
`;
