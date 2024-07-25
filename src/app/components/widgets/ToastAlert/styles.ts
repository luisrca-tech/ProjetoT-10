import { theme } from "~/app/styles/theme";
import { styled } from "@linaria/react";
import { darken } from "polished";

type ContainerProps = {
  status: string;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  min-width: 100%;
  height: ${(props) => (props.status === "error" ? "150px" : "100px")};

  gap: 18px;
  border: ${(props) => {
    switch (props.status) {
      case "error":
        return `1px solid ${darken(0.2, theme.COLORS.ERROR)}`;

      case "success":
        return `1px solid ${darken(0.2, theme.COLORS.SUCCESS)}`;

      case "warning":
        return `1px solid ${darken(0.2, theme.COLORS.WARNING)}`;

      default:
        return `1px solid ${darken(0.2, theme.COLORS.WARNING)}`;
    }
  }};

  border-radius: 5px;
  padding: 20px;
  background: ${(props) => {
    switch (props.status) {
      case "error":
        return `${theme.COLORS.ERROR}`;
      case "success":
        return `${theme.COLORS.SUCCESS}`;
      case "warning":
        return `${theme.COLORS.WARNING}`;
      default:
        return `${theme.COLORS.WARNING}`;
    }
  }};
  position: relative;

  span {
    font-size: ${(props) => (props.status === "success" ? "20px" : "16px")};
    width: 100%;
    color: ${(props) => {
      switch (props.status) {
        case "error":
          return darken(0.6, theme.COLORS.ERROR);
        case "success":
          return darken(0.6, theme.COLORS.SUCCESS);
        case "warning":
          return darken(0.6, theme.COLORS.WARNING);
        default:
          return darken(0.6, "gray");
      }
    }};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 1px;
    height: 6px;
    border-radius: 5px;
    background-color: ${(props) => {
      switch (props.status) {
        case "error":
          return darken(0.5, theme.COLORS.ERROR);
        case "success":
          return darken(0.5, theme.COLORS.SUCCESS);
        case "warning":
          return darken(0.5, theme.COLORS.WARNING);
        default:
          return darken(0.5, "gray");
      }
    }};
    animation: progress-bar 4s linear forwards;
  }

  @keyframes progress-bar {
    0% {
      width: 0%;
    }
    100% {
      width: 99%;
    }
  }
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;

  > span:nth-of-type(1) {
    font-weight: 700;
  }

  > span:nth-of-type(2) {
    font-size: 13px;
    text-align: left;
  }
`;
