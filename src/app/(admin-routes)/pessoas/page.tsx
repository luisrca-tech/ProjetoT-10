"use client";

import { FormForPeople } from "~/components/forms/FormForPeople";
import { AvailableFields } from "~/components/surfaces/AvailableFieldsTable";
import { ProjectHeader } from "~/components/surfaces/ProjectHeader";
import { BodyContainer, Container, InputsContent } from "./styles";

export default function Pessoas() {
  return (
    <Container>
      <ProjectHeader.Root>
        <ProjectHeader.BoxImage />
        <InputsContent>
          <ProjectHeader.EditProject />
        </InputsContent>
      </ProjectHeader.Root>

      <BodyContainer>
        <AvailableFields />
        <FormForPeople />
      </BodyContainer>
    </Container>
  );
}
