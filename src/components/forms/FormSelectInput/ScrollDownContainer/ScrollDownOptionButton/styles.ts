import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.button`
  padding: 0.75rem;
  display: flex;
  outline: none;
  border: none;
  gap: 0.5rem;
  border-radius: 60px;
  background: ${theme.COLORS.SELECT_INPUT};

  > span {
    font-size: 0.875rem;
    color: ${theme.COLORS.DARK};
    font-weight: ExtraLight;
  }
`;
