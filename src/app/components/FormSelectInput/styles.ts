import { styled } from "@linaria/react";
import { theme } from "@/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0 1.25rem;
`;

export const InputsDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type HeaderProps = {
  checked: boolean;
};

export const Header = styled.div<HeaderProps>`
  display: flex;
  gap: ${(props) => (props.checked ? "5.5rem" : "2.9rem")};
  padding: 0 0.75rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    font-size: 0.875rem;
    font-weight: bold;
    text-align: center;
  }
`;

type InputsRowProps = {
  checked: boolean;
};

export const InputsRow = styled.div<InputsRowProps>`
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
  gap: ${(props) => (props.checked ? "28px" : "")};
  background: ${theme.COLORS.LIGHT};
  width: 100%;

  input[type="date"] {
    background: ${theme.COLORS.SELECT_INPUT};
    border: none;
    padding: 0 0.5rem;
    height: 2.5rem;
    border-radius: 60px;
  }
`;

export const ScrollDownContainer = styled.div`
  margin-top: 0.25rem;
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

export const Footer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.25rem;
  gap: 5rem;

  > div {
    width: 100%;
  }
`;

export const BudgetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.875rem;
    font-weight: bold;
  }
`