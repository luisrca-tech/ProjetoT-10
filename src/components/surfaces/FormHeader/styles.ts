import { styled } from "@linaria/react";

type HeaderProps = {
  checked: boolean;
};

export const Container = styled.div<HeaderProps>`
  display: flex;
  gap: ${(props) => (props.checked ? "5.5rem" : "2.9rem")};
  padding: 0 0.5rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: bold;
  }

  span:nth-of-type(1) {
    text-align: start;
  }

  span:nth-of-type(2) {
    text-align: end;
  }

  span:nth-of-type(3) {
    text-align: end;
  }
`;

export const ColumnTitleContainer = styled.div`
  width: auto;
`;

export const EditDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 700;
  }

  span:nth-of-type(2) {
    text-align: end;
  }
`;
