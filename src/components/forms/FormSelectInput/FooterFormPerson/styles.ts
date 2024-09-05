import { styled } from "@linaria/react";
import { theme } from "~/app/styles/theme";

export const Container = styled.div`
  width: 100%;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const RoleAndPerson = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 0.875rem;
    color: ${theme.COLORS.DARK};
    font-weight: 600;
    line-height: 28px;
  }
`;

export const PersonByRoleForm = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.COLORS.LIGHT};
  border-radius: 60px;

  padding: 0.4rem 0.75rem;

  span {
    font-size: 1rem;
    color: ${theme.COLORS.SECONDARY_DARK};
    line-height: 24px;
  }
`;
