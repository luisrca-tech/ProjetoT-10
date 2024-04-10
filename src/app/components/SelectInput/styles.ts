import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

type ContainerProps = {
  checked: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: ${props => props.checked ? 'calc(100% - 28px)' : '32%'};
  height: 2.5rem;
  align-items: center;
`;

type InputProps = {
  hasValue: Boolean;
};

export const Input = styled.input<InputProps>`
  display: inline-block;
  padding-left: 0.75rem;
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    props.hasValue ? 'transparent' : `${theme.COLORS.SELECT_INPUT}`};
  border-radius: 60px;
  border: none;
  outline: none;

  &::placeholder {
    font-size: 1rem;
    color: ${theme.COLORS.SECONDARY_DARK};
  }
`;

export const SelectComponentContainer = styled.div`
  position: relative;
`;
