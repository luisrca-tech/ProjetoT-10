import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  font-family: "Roboto";
  font-size: 1rem;
  width: 100%;
`;

export const EditProjectContainer = styled.div`
  display: flex;
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

export const DataContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
