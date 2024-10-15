"use client";

import { FormForPeople } from "~/components/forms/FormForPeople";
import { AvailableFields } from "~/components/surfaces/AvailableFieldsTable";
import { ProjectHeader } from "~/components/surfaces/ProjectHeader";
import {
  BodyContainer,
  Container,
  HeadersContainer,
  InputsContent,
} from "./styles";

export default function Pessoas() {
  return (
    <Container>
      <HeadersContainer>
        <ProjectHeader.Root>
          <ProjectHeader.BoxImage />
          <InputsContent>
            <ProjectHeader.EditProject />
          </InputsContent>
        </ProjectHeader.Root>
      </HeadersContainer>
      <BodyContainer>
        <AvailableFields />
        <FormForPeople />
      </BodyContainer>
    </Container>
  );
}
