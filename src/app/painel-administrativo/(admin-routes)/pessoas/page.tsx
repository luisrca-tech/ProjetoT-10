"use client";

import { AvailableFields } from "~/components/forms/AvailableFieldsTable";
import { FooterForm } from "~/components/forms/FormSelectInput/FooterFormPerson";
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
        <FooterForm />
      </BodyContainer>
    </Container>
  );
}
