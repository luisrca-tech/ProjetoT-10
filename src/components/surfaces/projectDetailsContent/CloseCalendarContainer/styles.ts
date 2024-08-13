import { styled } from "@linaria/react";

interface ContainerProps {
  isDatePickerOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: ${(props) => (props.isDatePickerOpen ? "1" : "-1")};
  left: 0;
`;
