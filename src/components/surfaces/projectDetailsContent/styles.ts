import { styled } from "@linaria/react";

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
