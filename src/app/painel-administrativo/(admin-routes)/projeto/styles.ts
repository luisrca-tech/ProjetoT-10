import { theme } from "@/app/styles/theme";
import { styled } from "@linaria/react";
import { roboto, poppins } from "../../../fonts";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: roboto;

  padding: 0 1.25rem;
`;

export const InputsDataContainer = styled.div`
  max-width: 22.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputsData = styled.div`
  width: 21.5rem;
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  align-items: center;
 

  background-color: #f6f6f6;
  border-radius: 60px;

  span {
    width: 100%;
    font-size: 0.875rem;

    color: ${theme.COLORS.SECONDARY_DARK};
  }

  .RoleSpacing {
    padding: 0 0.5rem;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;

  margin-top: 1rem;

  span,
  strong {
    font-family: poppins;
  }

  span {
    font-weight: bold;
    font-size: 0.875rem;
  }
`;
