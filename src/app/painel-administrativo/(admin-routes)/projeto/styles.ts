import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
  padding-top: 1rem;
`;

export const InputsDataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1.25rem;
`;

export const InputsData = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  align-items: center;

  background-color: #f6f6f6;
  border-radius: 60px;

  span {
    width: 100%;
    font-size: 0.875rem;

    color: ${theme.COLORS.SECONDARY_DARK};
  }

  .RoleSpacing {
    padding: 0 0.5rem;
  }
`;

export const TotalBudget = styled.footer`
  display: flex;
  justify-content: space-between;

  margin-top: 1rem;

  span,
  strong {
    font-family: "Poppins";
  }

  span {
    font-weight: bold;
    font-size: 0.875rem;
  }
`;
export const SwitchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;

  span {
    font-size: 14px;
    font-weight: 600;
  }
`;
