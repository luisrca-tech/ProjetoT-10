import { styled } from "@linaria/react";
import { theme } from "@/app/styles/theme";

export const Container = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: transparent;
  color: ${theme.COLORS.PRIMARY};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
