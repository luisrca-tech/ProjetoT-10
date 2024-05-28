import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.5rem;
  gap: 5rem;

  > div {
    width: 100%;
  }
`;

export const ProjectDuration = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 0.875rem;
    font-weight: bold;
  }
`;

export const BudgetContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.875rem;
    font-weight: bold;
  }
`;
