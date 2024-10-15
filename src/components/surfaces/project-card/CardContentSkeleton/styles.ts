import { styled } from "@linaria/react";

export const Container = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 1rem 1rem;
`;

export const ImageSkeletonContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`

export const CardContentDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 13px;

  p {
    display: flex;
    align-items: center;
    gap: 4px;

    span {
      margin-right: 0.2rem;
    }
  }
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
