import { styled } from "@linaria/react";
import { darken } from "polished";
import { type HTMLInputTypeAttribute } from "react";
import { theme } from "~/app/styles/theme";

type InputProps = {
  type: HTMLInputTypeAttribute;
};

export const Container = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  border: none;

  > label {
    font-size: 0.75rem;
    color: ${() => theme.COLORS.PRIMARY};
  }

  &:has(input:focus) {
    > label {
      color: ${() => darken(0.1, theme.COLORS.PRIMARY)};
    }
  }

  &:has(input:invalid) {
    > label {
      color: ${() => darken(0.1, theme.COLORS.ERROR)};
    }
  }

  &:has(input:valid) {
    > label {
      color: ${() => theme.COLORS.PRIMARY};
    }
  }

  > div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid ${() => theme.COLORS.PRIMARY};
    margin-top: 7px;
    overflow: hidden;

    button {
      width: 24px;
      height: 24px;
      border: none;
      background-color: transparent;

      > div {
        width: 100%;
        height: 100%;
      }
    }

    &:has(> input:focus) {
      border-bottom: 2px solid ${() => darken(0.1, theme.COLORS.PRIMARY)};

      svg {
        fill: ${() => darken(0.1, theme.COLORS.PRIMARY)};
      }
    }

    &:has(> input:invalid) {
      border-bottom: 2px solid ${() => darken(0.1, theme.COLORS.ERROR)};

      svg {
        fill: ${() => darken(0.1, theme.COLORS.ERROR)};
      }
    }

    &:has(> input:valid) {
      border-bottom: 2px solid ${() => theme.COLORS.PRIMARY};

      svg {
        fill: ${() => darken(0.1, theme.COLORS.PRIMARY)};
      }
    }

    > input {
      height: 2.5rem;
      width: 100%;
      background-color: transparent;

      border: 0;
      outline: 0;
      color: ${() => theme.COLORS.DARK};

      &:focus {
        outline: none !important;
        background-color: transparent;
      }

      &::placeholder {
        color: ${() => theme.COLORS.GRAY};
      }

      input:-internal-autofill-selected {
        background-color: black;
        background-clip: content-box !important;
      }
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;

      svg {
        scale: 100px !important;
        fill: ${() => theme.COLORS.PRIMARY};
      }
    }
  }
`;
