import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

interface FormContainerProps {
  isDatePickerOpen: boolean;
  isProjectOptionsOpen?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MainContainer = styled.div`
  margin-top: 13.594rem;
  padding: 0 5%;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Container do formulário
export const FormContainer = styled.div<FormContainerProps>`
  padding-top: ${(props) => (props.isProjectOptionsOpen ? "120px" : "0")};
  filter: ${(props) => (props.isDatePickerOpen ? `blur(2px)` : `none`)};
  width: 100%;
  pointer-events: ${(props) => (props.isDatePickerOpen ? `none` : `auto`)};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 390px);
`;

// Container para os dados dos inputs
export const InputsDataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Estilos para os inputs
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

// Estilos para o orçamento total
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

// Container do switch
export const SwitchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 14px;
    font-weight: 600;
  }
`;

// Container para fechar o calendário
export const CloseCalendarContainer = styled.div<FormContainerProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: ${(props) => (props.isDatePickerOpen ? "1" : "-1")};
  left: 0;
`;
