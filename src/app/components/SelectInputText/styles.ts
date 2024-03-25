import { styled } from "@linaria/react";
import { theme } from "@/app/styles/theme";
import { HTMLInputTypeAttribute } from "react";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 5.125rem;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  max-width: 21.5rem;
  width: 100%;

  button {
    border: none;
    margin-left: -1rem;
    background-color: transparent;
  }
`;

type InputProps = {
  type: HTMLInputTypeAttribute;
};

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 2.5rem;
  border-radius: 60px;
  background-color: ${theme.COLORS.SELECT_INPUT};
  border: none;
  padding: 0.5rem 0.75rem;

  &::placeholder {
    color: ${theme.COLORS.SECONDARY_DARK};
    font-weight: bold;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  max-width: 21.5rem;
  flex: 1;

  button {
    background-color: transparent;
    border: none;
    margin-left: -1rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 2.5rem;
  border-radius: 60px;
  background-color: ${theme.COLORS.SELECT_INPUT};
  border: none;
  padding: 0.5rem 0.75rem;

  -webkit-appearance: none; /* Remove a seta de seleção padrão no Safari */
  -moz-appearance: none; /* Remove a seta de seleção padrão no Firefox */
  appearance: none; /* Remove a seta de seleção padrão nos demais navegadores */

  option:checked {
    color: ${theme.COLORS.SECONDARY_DARK};
    font-weight: bold;
  }
`;
