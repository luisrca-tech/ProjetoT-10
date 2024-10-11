import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: ${theme.COLORS.LIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  gap: 0.2rem;
`