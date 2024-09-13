"use client";

import { FormForPeople } from "~/components/forms/FormForPeople";
import { AvailableFields } from "~/components/surfaces/AvailableFieldsTable";
import Header from "~/components/surfaces/header";
import { ProjectProfileHeader } from "~/components/surfaces/ProjectProfileHeader";
import { BodyContainer, Container, HeadersContainer } from "./styles";
export default function Pessoas() {
  return (
    <Container>
      <HeadersContainer>
        <Header />
        <ProjectProfileHeader />
      </HeadersContainer>
      <BodyContainer>
        <AvailableFields />
        <FormForPeople />
      </BodyContainer>
    </Container>
  );
}
