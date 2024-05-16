import { ReactNode } from "react";

import { styled } from "@linaria/react";
import Header from "../components/header";
import { ProjectProfileHeader } from "../components/ProjectProfileHeader";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding-top: 12.594rem;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: AuthHeaderProps) {
  //Precisa de checked e isDatePickerOpen,checked, setChecked de um contexto para esse ProjectProfileHeader funcionar.

  /*  
    function ToggleDatePicker(){
      setIsDatePickerOpen(!isDatePickerOpen);
      //isDatePickerOpen->CONTEXTO
    }

*/

  return (
    <>
      <Header />
      <ProjectProfileHeader
      // checked={checked}  PEGAR CHECKED DO CONTEXTO.
      // value="Nome do Projeto..."
      // toggleDatePicker={ToggleDatePicker}
      //ADICIONAR AS PROPRIEDADES DEPOIS QUE FIZER O CONTEXTO ( PRODUZIR FUNCAO ToggleDatePicker)
      />
      <Container>{children}</Container>
    </>
  );
}
