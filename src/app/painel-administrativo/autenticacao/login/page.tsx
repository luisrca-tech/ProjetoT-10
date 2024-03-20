"use client";
import { Container } from "./styles";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <Container>
      <h1>Pagina Login</h1>
      <button
        onClick={() => router.push("/painel-administrativo/projetos")}
      ></button>
      <p>
        obs: nessa pagina o usuario sera autenticado com token, e pushado para
        /projetos.
      </p>
    </Container>
  );
}
