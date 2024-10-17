import { styled } from "@linaria/react";

export const Container = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  margin-top: 13.594rem;

  h1 {
    font-size: 1rem;
  }
`;

export const BodyContainer = styled.div`
  width: 100%;
  height: calc(100vh - 16rem);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;

  padding-bottom: 2rem;
`;

export const InputsContent = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 1rem;
  width: 100%;
`;
