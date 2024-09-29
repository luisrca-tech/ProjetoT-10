import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

type ContainerProps = {
  checked?: boolean;
};
export const Container = styled.div<ContainerProps>`
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
  gap: ${(props) => (props.checked ? "28px" : "")};
  background: ${theme.COLORS.LIGHT};
  width: 100%;
  position: relative;
  height: 2.5rem;
  align-items: center;
  padding-left: 12px;
  gap: 0.75rem;
`;
