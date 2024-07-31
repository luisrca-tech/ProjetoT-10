import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  background: ${theme.COLORS.SELECT_INPUT};
  border-radius: 20px;
  position: relative;
  transition: transform 0.5s ease;
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: bold;
  }

  span:nth-of-type(1) {
    text-align: start;
  }

  span:nth-of-type(2) {
    text-align: end;
  }

  span:nth-of-type(3) {
    text-align: end;
  }
`;

export const RowAndScrollDownContainer = styled.div`
  background: ${theme.COLORS.SELECT_INPUT};
  border-radius: 20px;
  position: relative;
  transition: transform 0.5s ease;
`;

export const InputContainer = styled.div`
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
  background: ${theme.COLORS.SECONDARY_EXTRA_LIGTH};
  width: 100%;
  position: relative;
  height: 100%;
`;

export const CalendarDateValues = styled.div`
  display: flex;
  gap: 0.2rem;
  height: 100%;
  align-items: center;
  font-family: "Roboto";
  font-size: 1rem;
  font-weight: Regular;
  padding: 11px 10px 0;
`;

export const ScrollDownContainer = styled.div`
  background: ${theme.COLORS.SELECT_INPUT};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 20px;
  padding: 0.75rem;

  > button {
    padding: 0.75rem;
    display: flex;
    outline: none;
    border: none;
    gap: 0.5rem;
    border-radius: 20px;
    background: ${theme.COLORS.SELECT_INPUT};

    > span {
      font-size: 0.875rem;
      color: ${theme.COLORS.DARK};
      font-weight: ExtraLight;
    }
  }
`;

export const InputDataMenu = styled.button`
  background: ${theme.COLORS.SELECT_INPUT};
  color: ${theme.COLORS.SECONDARY_DARK};
  font-size: 1rem;
  border: none;
  padding: 0 0.5rem;
  height: 2.5rem;
  border-radius: 60px;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SeparatorContainer = styled.div`
  border-bottom: 1px solid #dadada;

  &:last-child {
    border-bottom: none;
  }

  > button {
    padding: 0.75rem;
    display: flex;
    outline: none;
    border: none;
    gap: 0.5rem;
    border-radius: 60px;
    background: ${theme.COLORS.SELECT_INPUT};

    > span {
      font-size: 0.875rem;
      color: ${theme.COLORS.DARK};
      font-weight: ExtraLight;
    }
  }
`;
