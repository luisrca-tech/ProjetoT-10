import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

type ContainerProps = {
  checked?: boolean;
};
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.checked ? "calc(100% - 28px)" : "100%")};
  height: 2.5rem;
  position: relative;
  max-width: 100%;
  border-radius: 60px;
  overflow: hidden;
`;
export const Span = styled.span`
  font-size: 1rem;
  color: ${theme.COLORS.SECONDARY_DARK};
  line-height: 24px;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: auto 0;
  display: inline-block;
  overflow: hidden;
  font-weight: 500;
  max-width: 100%;
`;
