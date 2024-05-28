import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";
import FormSelect from "react-bootstrap/esm/FormSelect";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: -0.6rem;
  right: 0.8rem;
`;

export const CustomFormSelect = styled(FormSelect)`
  position: absolute;
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
  color: ${theme.COLORS.SECONDARY_DARK};
  background: ${theme.COLORS.SELECT_INPUT};
  width: 100%;
  border-radius: 20px;
`;
