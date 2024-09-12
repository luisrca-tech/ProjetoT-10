import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

type InputsRowProps = {
  checked?: boolean;
  offsetX?: number;
  offsetXByRow?: {
    [key: number]: number;
  };
  isLastRow?: boolean;
};

export const Container = styled.div<InputsRowProps>`
  background: ${theme.COLORS.SELECT_INPUT};
  border-radius: 20px;
  position: relative;
  transition: transform 0.5s ease;
  transform: translateX(
    ${(props) =>
      props.isLastRow
        ? props.offsetXByRow && props.offsetX
          ? "0"
          : "0"
        : props.offsetXByRow && props.offsetX
        ? "-1.5rem"
        : "0"}
  );
`;
