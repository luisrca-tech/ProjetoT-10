import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;

  width: 100%;
  padding: 1rem;
`;

export const Form = styled.form`
  display: flex;
  max-width: 328px;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
