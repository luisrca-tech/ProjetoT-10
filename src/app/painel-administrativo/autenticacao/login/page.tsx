"use client";

import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { roboto } from "~/assets/fonts/fonts";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";
import { useAuth } from "~/hooks/useAuth";
import { authSchema } from "~/schemas/auth.schema";
import { type authType } from "~/types/auth.type";
import {
  AlternativesLoginsContainer,
  AuthActions,
  ButtonText,
  ButtonsTextContainer,
  Container,
  Form,
  OtherOptionsContainer,
} from "./styles";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<authType>({
    resolver: zodResolver(authSchema),
  });
  const { Login, signInWithGoogle } = useAuth();
  const { isLoaded } = useSignIn();

  if (!isLoaded) return null;

  async function handleLogin({ email, password }: authType) {
    await Login({ email, password });
    reset();
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Input
          id="email"
          type="email"
          placeholder="email@exemplo.com"
          autoComplete="useremail"
          {...register("email")}
        />
        <ErrorMessage>
          {errors.email?.message && errors.email?.message}
        </ErrorMessage>
        <Input
          isPassword={true}
          id="password"
          type="password"
          placeholder="senha"
          autoComplete="current-password"
          {...register("password")}
        />
        <ErrorMessage>
          {errors.password?.message && errors.password?.message}
        </ErrorMessage>
        <Button
          className={roboto.className}
          loading={isSubmitting}
          text="Entrar"
          type="submit"
        />
      </Form>
      <OtherOptionsContainer>
        <ButtonsTextContainer>
          <ButtonText className={roboto.className}>
            <Link href={"/painel-administrativo/autenticacao/register"}>
              {" "}
              Não tenho conta
            </Link>
          </ButtonText>

          <ButtonText className={roboto.className}>
            <Link href={"/painel-administrativo/autenticacao/forgot-password"}>
              Esqueci minha senha
            </Link>
          </ButtonText>
        </ButtonsTextContainer>
      </OtherOptionsContainer>
      <AlternativesLoginsContainer>
        <div>
          <span className={roboto.className}>
            Entre com o{" "}
            <AuthActions onClick={signInWithGoogle}>
              google
            </AuthActions>
          </span>
        </div>
      </AlternativesLoginsContainer>
    </Container>
  );
}
