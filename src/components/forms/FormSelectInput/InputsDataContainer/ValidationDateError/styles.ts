import { styled } from "@linaria/react";
import { darken } from "polished";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  border: none;
  background-color: transparent;
  align-self: flex-start;
  cursor: pointer;
  position: fixed;
  bottom: 150px;
  button {
    border: none;
    background-color: transparent;
    > span {
      font-size: 14px;
      color: ${darken(0.5, theme.COLORS.ERROR)};
    }
  }

  &:hover {
    transform: scale(1.02);
  }
`;
