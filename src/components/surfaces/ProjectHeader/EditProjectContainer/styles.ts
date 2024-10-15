import { styled } from "@linaria/react";
type ContainerProps = {
  checked?: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: ${(props) => (props.checked ? `none` : `flex`)};
  width: 100%;
  position: relative;

  > svg {
    position: relative;
    right: 0;
  }

  > div:nth-of-type(2) {
    position: absolute;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
