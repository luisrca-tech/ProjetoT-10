import { styled } from "@linaria/react";

type ContainerProps = {
  checked?: boolean;
};
export const Container = styled.div<ContainerProps>`
  display: ${(props) => (props.checked ? `flex` : `none`)};
  width: 100%;
  align-items: center;
`;
export const DatesContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  padding: 4px;

  font-family: "Roboto";
  font-size: 1rem;
  font-weight: Regular;

  > p {
    font-size: 14px;
  }
`;
