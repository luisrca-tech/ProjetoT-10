"use client";

import Header from "~/components/surfaces/header";
import { ProjectsCards } from "~/components/surfaces/project-card";

import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { Container } from "./styles";

export default function Projetos() {
  const { session } = useSession();
  const { createOauthGoogleUser } = useAuth();
  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    if (session?.user && !userCreated) {
      createOauthGoogleUser();
      setUserCreated(true);
    }
  }, [createOauthGoogleUser, session, userCreated]);
  
  return (
    <Container>
      <Header />
      <ProjectsCards />
    </Container>
  );
}
