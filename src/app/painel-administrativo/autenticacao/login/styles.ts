import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  justify-content: center;
  margin: auto;
  width: 328px;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const ButtonsTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonText = styled.button`
  border: none;
  background-color: transparent;
  font-size: 0.875rem;
  color: ${theme.COLORS.PRIMARY};
  font-weight: 600;

  a {
    text-decoration: none;
  }
`;

export const AlternativesLoginsContainer = styled.div`
  margin-top: 1.563rem;
  width: 100%;
  justify-content: center;

  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div:nth-of-type(1) {
    span {
      font-size: 0.875rem;
      color: ${theme.COLORS.DARK};
      height: 1.25rem;
    }
  }

  > div:nth-of-type(2) {
    gap: 0.75rem;
    padding: 1rem 0;
  }
`;

export const OtherOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthActions = styled.button`
  all: unset;
`