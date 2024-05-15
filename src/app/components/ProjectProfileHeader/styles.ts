import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7.594rem;
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

export const InputContent = styled.div`
  height: 3rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  cursor: pointer;

  input {
    text-align: center;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const InputDataMenu = styled.div`
  background: transparent;
  border: 0;
  padding: 0 0.5rem;
  height: 2.5rem;
  border-radius: 60px;
  box-shadow: -4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  clip-path: inset(1);

  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1rem;
    color: ${theme.COLORS.SECONDARY_DARK};
  }
`;
