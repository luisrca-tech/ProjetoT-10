import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

interface SkeletonDivProps {
  width: string;
  height: string;
}

export const SkeletonDiv = styled.div<SkeletonDivProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 8px;
  background-color: ${theme.COLORS.GRAY};
  color: ${theme.COLORS.SECONDARY_DARK};
  @keyframes identifier {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  animation: identifier 1.5s infinite;
`;
