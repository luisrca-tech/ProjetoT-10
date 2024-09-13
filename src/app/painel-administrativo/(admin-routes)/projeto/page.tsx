"use client";

import { roboto } from "~/app/fonts";
import { Container } from "./styles";
import { Suspense } from "react";
import { ProjectDetailsContent } from "~/components/surfaces/projectDetailsContent";

export default function Projeto() {
  return (
    <Container className={roboto.className}>
      <Suspense>
        <ProjectDetailsContent />
      </Suspense>
    </Container>
  );
}
