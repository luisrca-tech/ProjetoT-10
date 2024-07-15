import { styled } from "@linaria/react";
import { theme } from "@/app/styles/theme";

type SidebaContainerType = {
  isShow: boolean;
};

type ContainerType = {
  isAutentication: boolean;
};

export const Container = styled.header<ContainerType>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isAutentication ? "center" : "space-between"};
  height: 7.594rem;
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 0;
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

export const TitleContainer = styled.div`
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

export const SidebarContainer = styled.div<SidebaContainerType>`
  padding: 3.75rem 5.625rem 0 1.938rem;
  display: flex;
  width: 66vw;
  flex-direction: column;
  height: 100vh;
  background-color: ${theme.COLORS.WHITE};
  border-radius: 20px 20px;
  z-index: 9999;
  position: fixed;
  left: ${(props) => (props.isShow ? `0` : `-66vw`)};
  top: 0;
  transition: left 0.3s;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SignOutAndProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;

  img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 20px;
  }
`
export const UserDataContainer = styled.div`
  display: flex;
  gap: 1rem;

  strong, span {
    font-size: 1.2rem;
  }
`

export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const SignOutButton = styled.button`
  all: unset;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  svg {
    width: 2.5rem;
    height: 2.5rem;

    color: ${theme.COLORS.ERROR};

    &:hover {
      opacity: 0.7;
    }
  }
`

export const CloseContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${theme.COLORS.LIGHT};
  > button {
    width: 100%;
    border: none;
    background-color: transparent;
    display: flex;
    gap: 10px;
    align-items: center;
    > span {
      color: ${theme.COLORS.PRIMARY};
      font-size: 1rem;
      font-weight: bold;
    }
    > svg {
      color: ${theme.COLORS.PRIMARY};
    }
  }
`;

export const AddProjectButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckProjectButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: transparent;
  color: ${theme.COLORS.PRIMARY};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${theme.COLORS.LIGHT};
  > button {
    background-color: transparent;
    color: ${theme.COLORS.DARK};
    font-size: 1rem;
    font-weight: 600;
    border: none;
  }
`;

export const PostTaskCheckButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: transparent;
  color: ${theme.COLORS.PRIMARY};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const UpdateTaskCheckButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: transparent;
  color: ${theme.COLORS.PRIMARY};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`