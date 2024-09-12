"use client";

import { AvailableFields } from "~/components/forms/AvailableFieldsTable";
import { ProjectProfileHeader } from "~/components/surfaces/ProjectProfileHeader";
import { BodyContainer, Container, HeadersContainer } from "./styles";
import { FormForPeople } from "~/components/forms/FormSelectInput/FormForPeople";
export default function Pessoas() {
  return (
    <Container>
      <HeadersContainer>
        <ProjectProfileHeader />
      </HeadersContainer>
      <BodyContainer>
        <AvailableFields />
        <FormForPeople />
      </BodyContainer>
    </Container>
  );
}
