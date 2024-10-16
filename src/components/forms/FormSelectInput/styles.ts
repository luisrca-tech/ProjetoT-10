import { styled } from "@linaria/react";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
