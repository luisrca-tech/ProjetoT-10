import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 7.594rem;
  position: fixed;
  z-index: 3;
  border-bottom-left-radius: 10px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 5rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;
  padding: 0 1.25rem;
  align-items: center;
  gap: 1rem;

  input {
    border: 0;
    background: transparent;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.COLORS.SECONDARY_DARK};
  }
`;

export const HeaderBoxProfileImage = styled.label`
  width: 5rem;
  height: 100%;
  background: ${theme.COLORS.PRIMARY};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${theme.COLORS.WHITE};
    font-size: 1.5rem;
    font-family: "Roboto";
  }

  input {
    display: none;
  }
`;
