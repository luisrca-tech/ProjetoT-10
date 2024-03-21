import { styled } from "@linaria/react";

export const Container = styled.header`
  width: 100%;
  display: flex;
  padding: 1.8rem 1.6rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const MenuButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background-color: transparent;
`;

export const AddProjectButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background-color: transparent;
`;

export const TitleContainer = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;
