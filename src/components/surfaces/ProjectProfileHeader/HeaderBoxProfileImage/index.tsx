import { useAtom } from "jotai";
import { Container } from "./styles";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { useState } from "react";
import Image from "next/image";

export default function HeaderBoxProfileImage() {
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [selectedFile] = useState<File | null>(null);
  const words =
    projectSelectedValue?.selectedValue[`projectRow-text`]?.split(" ");
  const initials = words?.map((word) => word.charAt(0));

  const initialsString = initials?.join("");

  return (
    <Container>
      {selectedFile ? (
        <Image
          src={URL.createObjectURL(selectedFile)}
          alt="Imagem selecionada"
        />
      ) : (
        <span>{initialsString?.toUpperCase()}</span>
      )}
    </Container>
  );
}
