import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";

type Status = {
  status: string;
};

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.375rem;

  h1 {
    font-size: 1rem;
  }

  table {
    border-collapse: collapse;
    width: 100%;

    tr {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid ${theme.COLORS.GRAY};
      padding: 0.781rem 0;

      td:nth-of-type(2) {
        text-align: center;
        display: flex;
        width: 30%;
        justify-content: flex-end;
        align-items: center;
      }
    }

    tbody {
      tr {
        font-size: 0.875rem;
        font-weight: 300;
      }

      tr:last-of-type {
        border-bottom: none;
      }
    }

    thead {
      font-weight: 700;
      > tr:nth-of-type(1) {
        padding-top: 0;
      }
    }
  }
`;
export const FirstTheadTh = styled.th`
  width: 40%;
  text-align: left;
`;

export const FirstTbodyTd = styled.td`
  width: 40%;
  text-align: left;
  font-weight: 400;

  > span {
    font-weight: 300;
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
  width: 30%;
`;

export const Status = styled.div<Status>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "on" ? theme.COLORS.SUCCESS : theme.COLORS.ERROR};
`;

export const InsertNameContainer = styled.div``;

export const LineContainer = styled.tr`
  border-bottom: 1px solid ${theme.COLORS.GRAY};
`;
