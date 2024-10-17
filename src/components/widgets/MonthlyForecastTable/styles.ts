import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const ForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`
export const ForecastMonths = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    font-weight: 600;
  }
`

export const ForecastSummary = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
  }
`;