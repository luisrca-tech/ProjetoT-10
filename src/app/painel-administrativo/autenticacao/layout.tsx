import { lighten } from "polished";
import { type ReactNode } from "react";
import { styled } from "@linaria/react";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";
import { theme } from "~/app/styles/theme";
import { auth } from "@clerk/nextjs/server";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100% - 7.594rem);
  width: 100%;
  margin: 0 auto;
  border: 1px solid ${() => lighten(0.34, theme.COLORS.GRAY)};
  border-radius: 12px;
`;

export default function AuthLayout({ children }: AuthHeaderProps) {
  const { userId } = auth();

  if (userId) redirect("/painel-administrativo/projetos");
  return (
    <Container>
      <Toaster richColors />
      <Main>{children}</Main>
    </Container>
  );
}
