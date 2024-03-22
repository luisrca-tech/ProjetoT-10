import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

export const Container = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.COLORS.SECONDARY};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spinAnimation 1s linear infinite;
  margin-right: 8px;

  @keyframes spinAnimation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
