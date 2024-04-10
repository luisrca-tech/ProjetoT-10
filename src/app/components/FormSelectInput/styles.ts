import { styled } from "@linaria/react";
import { theme } from "@/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const InputsDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    width: 100%;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    width: 100%;
  }
`;

type InputsRowProps = {
  checked: boolean;
};

export const InputsRow = styled.div<InputsRowProps>`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.checked ? '28px' : ''};
  background: ${theme.COLORS.LIGHT};

  input[type="date"] {
    background: ${theme.COLORS.SELECT_INPUT};
    border: none;
    padding: 0 0.5rem;
    height: 2.5rem;
    border-radius: 60px;
  }
`;
