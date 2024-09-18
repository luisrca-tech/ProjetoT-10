import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableTitle = styled.div`
  display: flex;
  justify-content:  space-around;
  align-items: center;

  span {
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 28px;
    padding-right: 1rem;
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

  max-height: 6.8rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.2rem;
    background-color: ${theme.COLORS.PRIMARY};
  }
`;

export const LoadingCustomFields = styled.p`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1rem;
`;

export const TableFields = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem;

  strong {
    max-width: 40%;
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    line-height: 28px;
    font-weight: 400;
  }

  span {
    min-width: 25%;
    color: ${theme.COLORS.DARK};
    font-size: 0.875rem;
    line-height: 28px;
  }
`;

export const IsAvailable = styled.div`
  position: absolute;
  right: 1rem;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 100px;
  background-color: #3cb31e;
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
