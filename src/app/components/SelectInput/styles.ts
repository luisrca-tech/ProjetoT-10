import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

type ContainerProps = {
  checked: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: ${(props) => (props.checked ? "calc(100% - 28px)" : "32%")};
  height: 2.5rem;
  align-items: center;
  position: relative;

  img {
    position: absolute;
    top: 5;
    right: 1rem;
  }
`;

type InputProps = {
  hasValue: Boolean;
};

export const Input = styled.input<InputProps>`
  display: inline-block;
  padding-left: 0.75rem;
  height: 100%;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${(props) =>
    props.hasValue ? "transparent" : `${theme.COLORS.SELECT_INPUT}`};
  border-radius: 60px;
  border: none;
  outline: none;

  &::placeholder {
    font-size: 1rem;
    color: ${theme.COLORS.SECONDARY_DARK};
  }

  box-shadow: -3px 1px 3px rgba(0, 0, 0, 0.25);
   -webkit-appearance: none;
  -moz-appearance: textfield; 


  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0; 

`;
