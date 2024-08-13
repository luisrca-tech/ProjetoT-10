import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  background: ${theme.COLORS.SELECT_INPUT};
  border-radius: 20px;
  position: relative;
  transition: transform 0.5s ease;
  width: 100%;
  background-color: transparent;

  > div:nth-of-type(2) {
    position: absolute;
    width: 100%;
  }
`;
