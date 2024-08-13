import { type ReactNode } from "react";
import { styled } from "@linaria/react";
import { Toaster } from "sonner";
import { auth } from "@clerk/nextjs/server";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: AuthHeaderProps) {
  auth().protect({
    unauthenticatedUrl: "/painel-administrativo/autenticacao/login",
    unauthorizedUrl: "/",
  });

  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
