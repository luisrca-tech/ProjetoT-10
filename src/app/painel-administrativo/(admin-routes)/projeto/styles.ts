import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f6;
`;

export const InputsDataContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.1rem 0;
  background-color: #f6f6f6;
`;

export const TitleProjectContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};

  strong {
  }
`;

export const BackgroundSizeImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  background-color: ${theme.COLORS.PRIMARY};
  color: ${theme.COLORS.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
`;
