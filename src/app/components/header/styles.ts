import { styled } from "@linaria/react";

import { css } from "@linaria/core";

type SidebaContainer = {
  isShow: boolean;
};

export const Container = styled.header`
  width: 100%;
  display: flex;
  padding: 1.8rem 1.6rem;
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

export const SidebarContainer = styled.div<SidebaContainer>`
  padding: 3.75rem 5.625rem 0 1.938rem;
  display: flex;
  width: 66vw;
  flex-direction: column;
  height: 100vh;
  background-color: #fffdfd;
  border-radius: 20px 20px;
  z-index: 9999;
  position: absolute;
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

export const CloseContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f3f4f6;

  > button {
    width: 100%;
    border: none;
    background-color: transparent;
    display: flex;
    gap: 10px;
    align-items: center;

    > span {
      color: #6750a4;
      font-size: 1rem;
      font-weight: bold;
    }

    > svg {
      color: #6750a4;
    }
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f3f4f6;

  > button {
    background-color: transparent;
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    border: none;
  }
`;
