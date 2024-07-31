import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  background: ${theme.COLORS.SELECT_INPUT};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 20px;
  padding: 0.75rem;
  max-height: 220px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.COLORS.PRIMARY};
    border-radius: 20px;
    border: 3px solid ${theme.COLORS.SELECT_INPUT};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.COLORS.DARK};
  }

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
