import { styled } from "@linaria/react";

export const Container = styled.div`
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
  background-color: #f7f2fa;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  clip-path: inset(1);
`;

export const CardContentContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 1rem;
`;

export const CardContentDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  padding: 0 0.375rem;
  margin-top: -1.75rem;
`;

export const BackgroundProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #eaddff;
  border-radius: 8px;
`;

export const ProgressBar = styled.div`
  max-width: 100%;
  height: 4px;
  background-color: #6750a4;
  border-radius: 8px;
`;
