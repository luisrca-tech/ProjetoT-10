import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 28px;
    padding-right: 1.25rem;
  }
`;

export const Separate = styled.div`
  border: 1px solid #dadada;
  width: 100%;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  height: 7rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const TableFields = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    line-height: 28px;
  }

  div {
    display: flex;
    gap: 2.5rem;
  }
`;

export const TableFooterCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    line-height: 28px;
  }
`;
