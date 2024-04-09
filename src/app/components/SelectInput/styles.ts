import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  width: 33%;
  height: 2.5rem;
  align-items: center;
  position: relative;

  input {
    position: relative;
    display: inline-block;
    padding-left: 0.75rem;
    height: 100%;
    width: 100%;
    background-color: ${theme.COLORS.SELECT_INPUT};
    border-radius: 60px;
    border: none;
    outline: none;

    &::placeholder {
      font-size: 1rem;
      color: ${theme.COLORS.SECONDARY_DARK};
    }
  }
`;
