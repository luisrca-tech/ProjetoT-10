import { styled } from "@linaria/react";
import { theme } from "@/app/styles/theme";

type InputsRowProps = {
  checked?: boolean;
  offsetX?: number;
  offsetXByRow?: {
    [key: number]: number;
  };
  isLastRow?: boolean;
};

type HeaderProps = {
  checked: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Header = styled.div<HeaderProps>`
  display: flex;
  gap: ${(props) => (props.checked ? "5.5rem" : "2.9rem")};
  padding: 0 0.5rem;
`;

export const EditDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: bold;
    text-align: end;
  }

  span:nth-of-type(1) {
    text-align: start;
  }

  span:nth-of-type(2) {
    text-align: end;
  }
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

export const InputsDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RowAndScrollDownContainer = styled.div<InputsRowProps>`
  background: ${theme.COLORS.SELECT_INPUT};
  border-radius: 20px;
  position: relative;
  transition: transform 0.5s ease;
  transform: translateX(
    ${(props) =>
      props.isLastRow
        ? props.offsetXByRow && props.offsetX
          ? "0"
          : "0"
        : props.offsetXByRow && props.offsetX
          ? "-1.5rem"
          : "0"}
  );
`;

export const InputsRow = styled.div<InputsRowProps>`
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
  gap: ${(props) => (props.checked ? "28px" : "")};
  background: ${theme.COLORS.LIGHT};
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

export const DeleteButtonAnimationFrame = styled.button<InputsRowProps>`
  width: 100%;
  height: 100%;
  padding-right: 5px;
  display: ${(props) => (props.isLastRow ? "none" : "flex")};
  align-items: center;
  justify-content: end;
  text-align: center;

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
  transition: transform 0.5s ease;
  transform: translateX(
    ${(props) =>
      props.isLastRow
        ? props.offsetXByRow && props.offsetX
          ? "0"
          : "0"
        : props.offsetXByRow && props.offsetX
          ? "1.5rem"
          : "0"}
  );

  background: ${theme.COLORS.SECONDARY};
  border-radius: 20px;
  border: 1px solid ${theme.COLORS.WHITE};
  outline: none;
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

export const Footer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.5rem;
  gap: 5rem;

  > div {
    width: 100%;
  }
`;