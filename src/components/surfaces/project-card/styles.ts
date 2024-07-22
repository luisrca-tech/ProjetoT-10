import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.25rem;
`;

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5rem;
  gap: 1rem;
  background-color: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 ${theme.COLORS.DARK};
  clip-path: inset(1);
`;

export const CardContentContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 1rem 1rem;
`;

export const CardContentDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-size: 13px;

  p {
    display: flex;
    gap: 4px;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  padding: 0 0.375rem;
  margin-top: -1.75rem;
`;

export const BackgroundProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${theme.COLORS.SECONDARY_LIGTH};
  border-radius: 8px;
`;

export const ProgressBar = styled.div`
  max-width: 100%;
  height: 4px;
  background-color: ${theme.COLORS.PRIMARY};
  border-radius: 8px;
`;
