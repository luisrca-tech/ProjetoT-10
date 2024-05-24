import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

type FormContainer = {
  isDatePickerOpen: boolean;
};

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

export const MainContainer = styled.div`
  margin-top: 12.594rem;
  max-width: 90vw;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;

  @media (min-width: 1000px) {
    max-width: 65vw;
  }
`;

export const FormContainer = styled.div<FormContainer>`
  filter: ${(props) => (props.isDatePickerOpen ? `blur(2px)` : `none`)};
  width: 100%;
  pointer-events: ${(props) => (props.isDatePickerOpen ? `none` : `auto`)};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputsDataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

  span {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const CloseCalendarContainer = styled.div<FormContainer>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: ${(props) => (props.isDatePickerOpen ? "1" : "-1")};
  left: 0;
`;
